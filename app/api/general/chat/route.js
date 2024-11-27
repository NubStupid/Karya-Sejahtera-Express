import connectMongoDB from "@/database/connectDB";
// import Chats from "@/models/Chats";
import Users from "@/models/Users";
// import ProductDistributors from "@/models/ProductDistributors";
import { NextResponse } from "next/server";

export async function PUT(request) {
    // console.log("masuk add data");
    
    // console.log(request);
    // console.log(await request.json());
    
    let { username, role, message, delivered } = await request.json() 

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
            await Users.findOneAndUpdate(
                { username },
                { $push: { "chats.messages": {sender: role, message, timestamp: now, read: false, delivered} } },
                { new: true, upsert: true }
            );
            await Users.findOneAndUpdate({ username }, { "chats.updatedAt": now });
            if(delivered == true)
                return NextResponse.json({message: "Chat berhasil dikirim"});
            else
                return NextResponse.json({message: "Chat gagal dikirim"});
        }
        await Users.updateOne(
            { username },
            { $set: { "chats.messages.$[elem].read": true } }, // Menggunakan `$` untuk menargetkan elemen yang cocok
            { arrayFilters: [{ "elem.read": false, "elem.sender": role, "elem.delivered": true }] }
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
    let chats = await Users.findOne({username}).sort({ "chats.messages.delivered": -1 });
    chats = chats.chats
    
    chats.messages.sort((a, b) => b.delivered - a.delivered)
    return NextResponse.json({chats});
}

export async function DELETE(request) {
    const {username, id} = await request.json();
    await connectMongoDB();

    const chat = await Users.findOne({username});
    let idx = chat.chats.messages.findIndex((c) => c._id == id);
    chat.chats.messages.splice(idx, 1);
    await chat.save();

    return NextResponse.json({message: "Pesan berhasil dihapus"});
}