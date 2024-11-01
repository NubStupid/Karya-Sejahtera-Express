// app/api/test/route.js
import connectMongoDB from "../../../database/connectDB";

export async function GET(req) {
    try {
        await connectMongoDB(); // Mencoba terhubung ke MongoDB
        return new Response(JSON.stringify({ message: "Database connection successful" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Database connection error:", error);
        return new Response(JSON.stringify({ message: "Database connection failed", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
