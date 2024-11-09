import connectMongoDB from "@/database/connectDB";
import Products from "@/models/Products";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const productId = await request.nextUrl.searchParams.get('productId') 
    // console.log(productId);
    // console.log(request);
    await connectMongoDB();
    let products = await Products.find({productId:productId});
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
