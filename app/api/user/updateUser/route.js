// /app/api/user/updateUser/route.js
import connectMongoDB from "../../../../database/connectDB";
import Users from "../../../../models/Users";

export async function POST(req) {
    await connectMongoDB();

    const { username, name, email, phone, address, profilePic } = await req.json();

    try {
        const updatedUser = await Users.findOneAndUpdate(
            { username },
            {
                $set: {
                    "profile.name": name,
                    "profile.email": email,
                    "profile.phone": phone,
                    "profile.address": address,
                    "profile.propic": profilePic,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "User updated successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update user data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
