import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET() {
    try
    {
        await connectMongoDB();
        let chats = await Users.find({role: { $ne: "admin" }, "chats.updatedAt": { $ne: null }}).sort({ "chats.updatedAt": -1 });
        return NextResponse.json({chats});
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json(err);
    }   
}