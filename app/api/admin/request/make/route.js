import connectMongoDB from "@/database/connectDB";
import Requests from "@/models/Requests";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB();
    
    const data = await Requests.aggregate([{$group:{_id:null,maxID:{$max:"$reqId"}}}])
    return NextResponse.json(data[0].maxID);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 
export async function POST(request) {
  try {
    await connectMongoDB();
    const req = await request.json()
    console.log(req);
    
    const data = await Requests.create(req)
    return NextResponse.json({message:"Successfully created a Request",payload:data});
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 