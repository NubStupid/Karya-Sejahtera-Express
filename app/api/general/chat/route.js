import connectMongoDB from "@/database/connectDB";
import Chats from "@/models/Chats";
// import ProductDistributors from "@/models/ProductDistributors";
import { NextResponse } from "next/server";

export async function PUT(request) {
    // console.log("masuk add data");
    
    // console.log(request);
    // console.log(await request.json());
    
    let { username, role, message } = await request.json() 

    // console.log(username + " " + role);
    // console.log(addMsg);
    
    await connectMongoDB();
    try
    {
        // console.log("action " + addMsg);
        
        if(message)
        {
            role == "admin" ? role = "admin" : role = "user"
            let now = new Date();
            await Chats.findOneAndUpdate(
                { username },
                { $push: { messages: {sender: role, message, timestamp: now, read: false} } },
                { new: true, upsert: true }
            );
            await Chats.findOneAndUpdate({ username }, { updatedAt: now });
            return NextResponse.json({message: "Chat berhasil dikirim"});
        }
        await Chats.updateOne(
            { username },
            { $set: { "messages.$[elem].read": true } }, // Menggunakan `$` untuk menargetkan elemen yang cocok
            { arrayFilters: [{ "elem.read": false, "elem.sender": role }] }
        );
        // role == "admin" ? role = "admin" : role = "user"
        return NextResponse.json({message: "Chat dibaca"});
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json(err);
    }
}

export async function GET(request) {
    const username = await request.nextUrl.searchParams.get('username')
    await connectMongoDB();
    let chats = await Chats.find({username});
    return NextResponse.json({chats});
}

// export async function PUT(request) {
//     const {id, productName, desc, price, img} = await request.json() 
//     await connectMongoDB();
//     await ProductDistributors.updateOne({productDId: id}, {productName, desc, price, img});
//     return NextResponse.json({message: "Produk berhasil diupdate"});
// }

// export async function DELETE(request) {
//     const {id} = await request.json() ;
//     await connectMongoDB();
//     await ProductDistributors.updateOne({productDId: id}, {deletedAt: new Date()})
//     return NextResponse.json({message: "Produk berhasil dihapus"});
// }