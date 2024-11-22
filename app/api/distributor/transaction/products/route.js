import connectMongoDB from "@/database/connectDB";
import ProductDistributors from "@/models/ProductDistributors";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const productId = await request.nextUrl.searchParams.get('productId') 
    // console.log(productId);
    // console.log(request);
    await connectMongoDB();
    let products = await ProductDistributors.find({productDId:productId});
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
