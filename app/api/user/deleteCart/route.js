// /app/api/user/addToCart/route.js
import connectMongoDB from "../../../../database/connectDB";
import Users from "@/models/Users";

export async function DELETE(req) {
    await connectMongoDB();

    const { username } = await req.json();

    if (!username) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), { 
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        const user = await Users.findOneAndUpdate(
            {username: username},
            { $set: { cart: [] } },
            { new: true }
          );

        return new Response(JSON.stringify({ message: 'Cart deleted successfully' }), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error('Error deleting cart:', error);
        return new Response(JSON.stringify({ message: 'Error deleting cart', error: error }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
