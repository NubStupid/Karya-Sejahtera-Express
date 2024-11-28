import connectMongoDB from "@/database/connectDB";
import ProductDistributors from "@/models/ProductDistributors";
import Users from "@/models/Users";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB();
    
    let distributor = await Users.find({role:"distributor",active:true})

    // console.log(distributor);
    
    let data = await Promise.all(distributor.map(async (d)=>{
        const allProductData = await ProductDistributors.find({username:d.username})
        const distributorData = {
            profile:d.profile,
            products:allProductData
        }
        return distributorData;        
    }))
    // console.log(JSON.stringify(data));
    

    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 
export async function POST() {
  try {
    await connectMongoDB();
    
    let distributor = await Users.find({role:"distributor",active:true})

    // console.log(distributor);
    
    let data = await Promise.all(distributor.map(async (d)=>{
        const allProductData = await ProductDistributors.find({username:d.username})
        const distributorData = {
            profile:d.profile,
            products:allProductData
        }
        return distributorData;        
    }))
    // console.log(JSON.stringify(data));
    

    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 