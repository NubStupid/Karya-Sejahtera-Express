import connectMongoDB from "@/database/connectDB";
import Requests from "@/models/Requests";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const {reqId} = await request.json()
    await connectMongoDB();
    let products = await Requests.find({reqId:reqId});
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
