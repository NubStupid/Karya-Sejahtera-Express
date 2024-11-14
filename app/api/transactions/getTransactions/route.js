import connectMongoDB from "@/database/connectDB";
import Transactions from "@/models/Transactions";

export async function GET(req) {
    try {
        await connectMongoDB();
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");

        if (!username) {
            return new Response(JSON.stringify({ error: "Username is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const transactions = await Transactions.find({ username }).sort({ createdAt: -1 });
        return new Response(JSON.stringify(transactions), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch transactions" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
