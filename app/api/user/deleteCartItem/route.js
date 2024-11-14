import connectMongoDB from "../../../../database/connectDB";
import Users from "@/models/Users";

export async function DELETE(req) {
    const { username, productId } = await req.json();

    try {
        await connectMongoDB();
        const user = await Users.findOne({ username });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        user.cart = user.cart.filter(item => item.productId !== productId);
        await user.save();

        return new Response(JSON.stringify({ message: "Item removed from cart successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete cart item" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
