// pages/api/user/updateUser.js
import connectMongoDB from "../../../../database/connectDB.js";
import Users from "../../../../models/Users";

export default async function handler(req, res) {
    await connectMongoDB();

    if (req.method === "POST") {
        const { username, name, email, phone, address, password, profilePic } = req.body;

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
                    }
                },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to update user data" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
