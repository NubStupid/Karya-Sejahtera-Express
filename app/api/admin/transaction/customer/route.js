import connectMongoDB from "@/database/connectDB";
import Products from "@/models/Products";
import Transactions from "@/models/Transactions";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB();
    let customer = await Transactions.find();
    let updatedData = await Promise.all(customer.map(async (d)=>{
      if(d.products.length == 1){
        const productId = d.products[0].productId
        let product = await Products.find({productId:productId})
        const updated = 
          [{
                ...d.products[0]._doc,
                productName:product[0].productName,
                desc:product[0].desc,
                img:product[0].img,
                payment:d.payment,
                status:d.status,
                transId:d.transId,
                username:d.username
          }]
        return updated
        
      }else{
        const updateBatchProduct = Promise.all(d.products.map(async (p)=>{
          const productId = p.productId
          let product = await Products.find({productId:productId})          
          const updated = 
          {
            ...p._doc,
            productName:product[0].productName,
            desc:product[0].desc,
            img:product[0].img,
            payment:d.payment,
            status:d.status,
            transId:d.transId,
            username:d.username
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