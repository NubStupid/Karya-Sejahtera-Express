// /app/api/user/clearCart/route.js
import connectMongoDB from "../../../../database/connectDB";
import Users from "../../../../models/Users";

export async function DELETE(req) {
    await connectMongoDB();

    const { username } = await req.json();

    if (!username) {
        return new Response(JSON.stringify({ message: "Username tidak ditemukan." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        await Users.updateOne({ username }, { $set: { cart: [] } });
        return new Response(JSON.stringify({ message: "Cart berhasil dihapus." }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
        return new Response(JSON.stringify({ message: "Gagal menghapus cart.", error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
