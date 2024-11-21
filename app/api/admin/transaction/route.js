import connectMongoDB from "@/database/connectDB";
import Requests from "@/models/Requests";
import Transactions from "@/models/Transactions";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB();
    let distributor = await Requests.find().limit(5);
    let customer = await Transactions.find().limit(5);
    return NextResponse.json({ distributor,customer });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}