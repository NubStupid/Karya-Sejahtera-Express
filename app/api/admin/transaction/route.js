import connectMongoDB from "@/database/connectDB";
import Requests from "@/models/Requests";
import Transactions from "@/models/Transactions";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    await connectMongoDB();
    let distributor = await Requests.find();
    let customer = await Transactions.find();
    return NextResponse.json({ distributor,customer });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}