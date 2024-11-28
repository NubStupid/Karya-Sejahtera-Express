import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectMongoDB(); // Koneksi ke database

        const data = await request.json();
        data["chats"] = { messages: [], updatedAt: null }
        const user = new Users(data);
        await user.save();

        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}