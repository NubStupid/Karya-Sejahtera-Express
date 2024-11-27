import connectMongoDB from "@/database/connectDB";
// import Chats from "@/models/Chats";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    let chats = await Users.find({role: { $ne: "admin" }, "chats.updatedAt": { $ne: null }}).sort({ "chats.updatedAt": -1 });
    // chats = chats.map((c) => (c.chats))
    
    return NextResponse.json({chats});
}