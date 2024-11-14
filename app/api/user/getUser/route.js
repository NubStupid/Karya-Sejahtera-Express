// /pages/api/user/getUser.js
import connectMongoDB from "../../../../database/connectDB";
import Users from "@/models/Users";

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
        const user = await Users.findOne({ username }, 'username profile');
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({
            username: user.username,
            profile: user.profile
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch user data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
