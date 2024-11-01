import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
import Chats from "@/models/Chats";
import Products from "@/models/Products";
import Requests from "@/models/Requests";
import ProductDistributors from "@/models/ProductDistributors";
import Transactions from "@/models/Transactions";
import Storages from "@/models/Storages";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { username, password, role, profile, active } = await request.json();
    await connectMongoDB();
    
    try
    {
        await Users.create({username, password, role, profile, active});
        return NextResponse.json(error);
    }
    catch(err)
    {
        return NextResponse.json(err);
    }
}

export async function GET() {
    await connectMongoDB();
    const users = await Users.find();
    return NextResponse.json({users});
}