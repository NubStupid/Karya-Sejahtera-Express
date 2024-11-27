import connectMongoDB from "@/database/connectDB";
import Transactions from "@/models/Transactions";
import Products from "@/models/Products"; // Pastikan model produk diimpor

export async function POST(req) {
    try {
        await connectMongoDB();
        
        const { transId, username, products, grandTotal, payment } = await req.json();
        
        if (!transId || !username || !products || !grandTotal || !payment) {
            return new Response(JSON.stringify({ error: "Incomplete data" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const transformedProducts = products.map(product => ({
            productId: product.productId,
            qty: product.qty,
            price: product.price,
            basePrice: product.base_price,
            subtotal: product.price * product.qty,
        }));

        const newTransaction = new Transactions({
            transId,
            username,
            products: transformedProducts,
            grandTotal,
            payment,
            status: 'Success',
        });
        
        await newTransaction.save();

        // Update stock for each product
        for (const product of transformedProducts) {
            const existingProduct = await Products.findOne({productId: product.productId});

            if (!existingProduct) {
                return new Response(
                    JSON.stringify({ error: `Product with ID ${product.productId} not found` }),
                    {
                        status: 404,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }

            if (existingProduct.stock < product.qty) {
                return new Response(
                    JSON.stringify({ error: `Insufficient stock for product ID ${product.productId}` }),
                    {
                        status: 400,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }

            existingProduct.stock -= product.qty; // Reduce stock
            await existingProduct.save(); // Save updated stock
        }

        return new Response(
            JSON.stringify({ message: "Transaction added successfully", transaction: newTransaction }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to add transaction" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
