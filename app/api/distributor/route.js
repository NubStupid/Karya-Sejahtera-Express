import connectMongoDB from "@/database/connectDB";
import ProductDistributors from "@/models/ProductDistributors";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {username, productName, desc, price, img} = await request.json() 
    try
    {
        await connectMongoDB();
        const count = await ProductDistributors.countDocuments();
        const id = "PD" + (count + 1).toString().padStart(3, '0')
        await ProductDistributors.create({productDId: id, username, productName, desc, price: parseInt(price), img})
        return NextResponse.json({message: "Produk berhasil ditambahkan", id});
    }
    catch(err)
    {
        return NextResponse.json(err);
    }
}

export async function GET(request) {
    const id = await request.nextUrl.searchParams.get('id') 
    try
    {
        await connectMongoDB();
        let products = await ProductDistributors.find({deletedAt: null});
        if(id)
            products = await ProductDistributors.find({productDId: id});
        return NextResponse.json({products});
    }
    catch(err)
    {
        return NextResponse.json(err);
    }
}

export async function PUT(request) {
    const {id, productName, desc, price, img} = await request.json() 
    try
    {
        await connectMongoDB();
        await ProductDistributors.updateOne({productDId: id}, {productName, desc, price, img});
        return NextResponse.json({message: "Produk berhasil diupdate"});
    }
    catch(err)
    {
        return NextResponse.json(err);
    }
}

export async function DELETE(request) {
    const {id} = await request.json() ;
    try
    {
        await connectMongoDB();
        await ProductDistributors.updateOne({productDId: id}, {deletedAt: new Date()})
        return NextResponse.json({message: "Produk berhasil dihapus"});
    }
    catch(err)
    {
        return NextResponse.json(err);
    }
}