// /pages/api/user/getUserCart.js
import connectMongoDB from "../../../../database/connectDB";
import Users from "@/models/Users";
import Products from "@/models/Products";

export async function GET(req) {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
        return new Response(JSON.stringify({ error: "Username is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const user = await Users.findOne({ username }, 'cart');
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const cartWithDetails = await Promise.all(user.cart.map(async (item) => {
            const product = await Products.findOne({ productId: item.productId }).exec();
            if (product) {
                return {
                    productId: product.productId,
                    productName: product.productName,
                    img: product.img,
                    price: product.price,
                    qty: item.qty,
                    stock: product.stock
                };
            }
            return null; // Handle cases where the product may not exist
        }));

        // Filter out any null entries in case some products were not found
        const filteredCart = cartWithDetails.filter(item => item !== null);

        // Structure the final response
        return new Response(JSON.stringify({
            cart: filteredCart
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch cart data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
