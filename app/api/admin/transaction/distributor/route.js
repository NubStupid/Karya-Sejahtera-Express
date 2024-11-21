import connectMongoDB from "@/database/connectDB";
import Products from "@/models/Products";
import Requests from "@/models/Requests";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB();
    let distributor = await Requests.find();
    console.log("===");
    let updatedData = await Promise.all(distributor.map(async (d)=>{
      if(d.products.length == 1){
        let product = await Products.find({
          productId:d.products[0].productId
        })
        const updated = 
          [{
            ...d.products[0],
            productName:product[0].productName,
            desc:product[0].desc,
            img:product[0].img
          }]
        d.products = updated
        return updated
        
      }else{
        // console.log("b");
        
      }
      
    }))
    console.log(JSON.stringify(updatedData));
    
    
    return NextResponse.json(distributor);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 