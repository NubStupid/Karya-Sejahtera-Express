import connectMongoDB from "@/database/connectDB";
import ProductDistributors from "@/models/ProductDistributors";
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    const {username, productName, desc, price, img} = await request.json() 
    await connectMongoDB();
    const count = await ProductDistributors.countDocuments();
    const id = "PD" + (count + 1).toString().padStart(3, '0')
    try
    {   
        let type = img.match(/^data:image\/(\w+);base64,/);
        type = type[1] == 'jpeg' ? 'jpg' : type[1]
        
        const base64Img= img.replace(/^data:image\/\w+;base64,/, '');
        const uploadDir = path.join(process.cwd(), 'public/uploads/productDistributors');

        if (!fs.existsSync(uploadDir))
            fs.mkdirSync(uploadDir, { recursive: true });

        
        const existingFiles = fs.readdirSync(uploadDir).filter(file => file.startsWith(id));
        if (existingFiles.length > 0) {
            for (const file of existingFiles)
                fs.unlinkSync(path.join(uploadDir, file));
        }

        const filePath = path.join(uploadDir, `${id}.${type}`);
        fs.writeFileSync(filePath, Buffer.from(base64Img, 'base64'));
        
        const imgDir = `/uploads/productDistributors/${id}.${type}`
        await ProductDistributors.create({productDId: id, username, productName, desc, price: parseInt(price), img: imgDir})
        return NextResponse.json({message: "Produk berhasil ditambahkan", id});
    }
    catch(err)
    {
        return NextResponse.json(err);
    }
}

export async function GET(request) {
    const id = await request.nextUrl.searchParams.get('id') 
    await connectMongoDB();
    let products = await ProductDistributors.find({deletedAt: null});
    if(id)
        products = await ProductDistributors.find({productDId: id});
    return NextResponse.json({products});
}

export async function PUT(request) {
    const {id, productName, desc, price, img} = await request.json() 
    await connectMongoDB();
    await ProductDistributors.updateOne({productDId: id}, {productName, desc, price, img});
    return NextResponse.json({message: "Produk berhasil diupdate"});
}

export async function DELETE(request) {
    const {id} = await request.json() ;
    await connectMongoDB();
    await ProductDistributors.updateOne({productDId: id}, {deletedAt: new Date()})
    return NextResponse.json({message: "Produk berhasil dihapus"});
}