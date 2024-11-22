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

export async function PATCH(request) {
  const {reqId, products,notes} = await request.json()
  console.log(products);
   
  await connectMongoDB();
  try
  {   
      let validate = await Requests.findOne({reqId:reqId})
      console.log(validate);
      
      const result = await Requests.updateOne({reqId:reqId},{
        $set:{
          products:products,
          notes:notes
        }
      })
      if (result.matchedCount === 0) { return NextResponse.json({ error: 'Product not found' }, { status: 404 }); }
      console.log(result);
      
      return NextResponse.json({message: "Request Updated!",body:result});
  }
  catch(err)
  {
      console.log(err);
      return NextResponse.json(err);
  }
}
