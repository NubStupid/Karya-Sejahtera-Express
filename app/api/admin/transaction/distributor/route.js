import connectMongoDB from "@/database/connectDB";
import ProductDistributors from "@/models/ProductDistributors";
import Requests from "@/models/Requests";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB();
    let distributor = await Requests.find();
    let updatedData = await Promise.all(distributor.map(async (d)=>{
      if(d.products.length == 1){
        const productId = d.products[0].productId
        // console.log(productId);
        let product = await ProductDistributors.find({productDId:productId})
        const updated = 
          [{
            reqId:d.reqId,
            ...d.products[0],
            productName:product[0].productName,
            desc:product[0].desc,
            img:product[0].img,
            notes:d.notes,
            
          }]
        return updated
        
      }else{
        const updateBatchProduct = Promise.all(d.products.map(async (p)=>{
          const productId = p.productId
          let product = await ProductDistributors.find({productDId:productId})          
          const updated = 
          {
            reqId:d.reqId,
            ...p,
            productName:product[0].productName,
            desc:product[0].desc,
            img:product[0].img,
            notes:d.notes,
          }
          // console.log(updated);
          
          return updated
        }))
        
        return updateBatchProduct
        
      }
      
    }))
    console.log(updatedData);
    
    
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 