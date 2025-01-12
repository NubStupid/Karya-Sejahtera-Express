import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
import bcrypt from "bcrypt";

export async function POST(req) {
    await connectMongoDB();

    try {
        const { username, password, role, profile, active } = await req.json();

        // Log input data
        console.log("Received data:", { username, password, role, profile, active });

        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return new Response(
                JSON.stringify({ message: "Username sudah digunakan." }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({
            username,
            password: hashedPassword,
            role,
            profile,
            active
        });

        await newUser.save();

        return new Response(
            JSON.stringify({ message: "Registrasi berhasil!" }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error in registration:", error);

        return new Response(
            JSON.stringify({ message: "Registrasi gagal. Silakan coba lagi." }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
