import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectMongoDB();
        const data = await request.json();

        let username = data.username
        let password = data.password

        const user = await Users.findOne({ username, password });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid username or password' });
        }

        return NextResponse.json({ success: true, message: 'Login successful', data: user });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}