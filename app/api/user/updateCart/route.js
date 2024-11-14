import connectMongoDB from "../../../../database/connectDB";
import Users from "@/models/Users";
import Products from "@/models/Products";

export async function POST(req) {
    const { username, productId, qty } = await req.json();

    try {
        await connectMongoDB();

        const user = await Users.findOne({ username });
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const product = await Products.findOne({ productId });
        if (!product) {
            return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
        }

        const cartItem = user.cart.find((item) => item.productId === productId);

        if (cartItem) {
            cartItem.qty = Math.min(cartItem.qty + qty, product.stock);
        } else {
            user.cart.push({ productId, qty: Math.min(qty, product.stock) });
        }

        await user.save();

        return new Response(JSON.stringify({ message: "Product updated in cart successfully", cart: user.cart }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update product in cart" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
