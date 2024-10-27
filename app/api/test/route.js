import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
import Chats from "@/models/Chats";
import Products from "@/models/Products";
import Requests from "@/models/Requests";
import ProductDistributors from "@/models/ProductDistributors";
import Transactions from "@/models/Transactions";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { username, name } = await request.json();
    await connectMongoDB();
    await Users.create({username, name});
    return NextResponse.json({message: "User berhasil ditambahkan"});
}

export async function GET() {
    await connectMongoDB();
    const users = await ProductDistributors.find();
    return NextResponse.json({users});
}