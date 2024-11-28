import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectMongoDB();
        const users = await Users.find({role: { $ne: "admin" }});
        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}