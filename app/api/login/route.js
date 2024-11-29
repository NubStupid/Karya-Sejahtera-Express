import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
import bcrypt from "bcrypt";

export async function POST(req) {
    await connectMongoDB();

    try {
        const { username, password } = await req.json();

        console.log("Login attempt:", { username, password });

        const user = await Users.findOne({ username });

        if (!user) {
            return new Response(
                JSON.stringify({ message: "Username atau password salah." }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return new Response(
                JSON.stringify({ message: "Username atau password salah." }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Logging user data for debugging
        console.log("User authenticated:", { username: user.username, role: user.role });

        return new Response(
            JSON.stringify({
                data: {
                    username: user.username,
                    role: user.role,
                    profile: {
                        profpic: user.profile.profpic,
                    },
                },
                message: "Login berhasil.",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error during login:", error);

        return new Response(
            JSON.stringify({ message: "Login gagal. Silakan coba lagi." }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
