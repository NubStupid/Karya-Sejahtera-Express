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
  const { reqId, products } = await request.json();
   
  await connectMongoDB();
  try {   
    // Find the document by reqId
    let validate = await Requests.findOne({ reqId: reqId });
    
    if (!validate) {
      console.log('Document not found for reqId:', reqId);
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }
    console.log(JSON.stringify(products));
    
    console.log('Before update:', validate);

    // Update the products field in the document
    const result = await Requests.updateOne(
      { reqId: reqId },
      { $set: { products: products } }
    );

    // Check if the document was found and modified
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }
    if (result.modifiedCount === 0) {
      console.log('Document matched but no changes made');
    }
    
    console.log('Update Result:', result);

    // Fetch the updated document to verify changes
    const updatedDoc = await Requests.findOne({ reqId: reqId });
    console.log('After update:', updatedDoc);

    return NextResponse.json({ message: 'Request Updated!', body: updatedDoc });
  } catch (err) {
    console.error('Error updating request:', err.message);
    return NextResponse.json({ error: 'Failed to update request', details: err.message }, { status: 500 });
  }
}


