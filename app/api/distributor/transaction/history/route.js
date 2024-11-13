import connectMongoDB from "@/database/connectDB";
import Requests from "@/models/Requests";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const username = request.nextUrl.searchParams.get("username")
    await connectMongoDB();
    let products = await Requests.find({username:username});
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
