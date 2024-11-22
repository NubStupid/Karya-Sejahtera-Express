// /app/api/user/updateUser/route.js
import connectMongoDB from "../../../../database/connectDB";
import Users from "../../../../models/Users";

export async function POST(req) {
    await connectMongoDB();

    const { username, name, email, phone, address, profilePic } = await req.json();
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!address) missingFields.push("address");
    if (!profilePic) missingFields.push("profile picture");

    if (missingFields.length > 0) {
        
        return new Response(
            JSON.stringify({ error: `Field ini harus diisi: ${missingFields.join(", ")}` }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    try {
        const updatedUser = await Users.findOneAndUpdate(
            { username },
            {
                $set: {
                    "profile.name": name,
                    "profile.email": email,
                    "profile.phone": phone,
                    "profile.address": address,
                    "profile.profpic": profilePic,
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
