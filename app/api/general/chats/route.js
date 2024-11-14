import connectMongoDB from "@/database/connectDB";
import Chats from "@/models/Chats";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    let chats = await Chats.find().sort({ updatedAt: -1 });
    return NextResponse.json({chats});
}