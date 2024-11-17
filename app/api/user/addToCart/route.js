// /app/api/user/addToCart/route.js
import connectMongoDB from "../../../../database/connectDB";
import Users from "@/models/Users";
import Products from "@/models/Products";

export async function POST(req) {
    await connectMongoDB();

    const { username, productId, qty } = await req.json();

    if (!username || !productId || !qty) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), { 
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        // Find the user by username
        const user = await Users.findOne({ username });
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { 
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Find the product by productId
        const product = await Products.findOne({ productId });
        if (!product) {
            return new Response(JSON.stringify({ message: 'Product not found' }), { 
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Check if requested quantity exceeds stock
        if (product.stock < qty) {
            return new Response(JSON.stringify({ message: 'Quantity exceeds available stock' }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Check if the product already exists in the user's cart
        const cartItem = user.cart.find((item) => item.productId === productId);
        if (cartItem) {
            const newQty = cartItem.qty + qty;
            if (newQty > product.stock) {
                return new Response(JSON.stringify({ message: 'Quantity exceeds available stock' }), { 
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                });
            }
            cartItem.qty = newQty;
        } else {
            user.cart.push({ productId, qty });
        }

        await user.save();

        return new Response(JSON.stringify({ message: 'Product added to cart successfully', cart: user.cart }), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return new Response(JSON.stringify({ message: 'Error adding product to cart' }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
