import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function OPTIONS(request) {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': 'https://karyasejahteraexpress.my.id',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

export async function PUT(request) {
    let { username, role, message, delivered } = await request.json() 
    try
    {
        await connectMongoDB();
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
            {
                return new Response(JSON.stringify({ message: 'Chat berhasil dikirim' }), {
                    status: 200,
                    headers: {
                      'Access-Control-Allow-Origin': 'https://karyasejahteraexpress.my.id',
                    },
                });
                  // return NextResponse.json({message: "Chat berhasil dikirim"});
            }
            else
            {
                return new Response(JSON.stringify({ message: 'Chat gagal dikirim' }), {
                    status: 200,
                    headers: {
                      'Access-Control-Allow-Origin': 'https://karyasejahteraexpress.my.id',
                    },
                });
                // return NextResponse.json({message: "Chat gagal dikirim"});
            }
        }
        await Users.updateOne(
            { username },
            { $set: { "chats.messages.$[elem].read": true } },
            { arrayFilters: [{ "elem.read": false, "elem.sender": role, "elem.delivered": true }] }
        );
        return new Response(JSON.stringify({ message: 'Chat dibaca' }), {
            status: 200,
            headers: {
              'Access-Control-Allow-Origin': 'https://karyasejahteraexpress.my.id',
            },
        });
        // return NextResponse.json({message: "Chat dibaca"});
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json(err);
    }
}

export async function GET(request) {
    const username = await request.nextUrl.searchParams.get('username')
    try
    {
        await connectMongoDB();
        let chats = await Users.findOne({username}).sort({ "chats.messages.delivered": -1 });
        chats = chats.chats
        
        chats.messages.sort((a, b) => b.delivered - a.delivered)
        return NextResponse.json({chats});
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json(err);
    }
    
}

export async function DELETE(request) {
    const {username, id} = await request.json();
    try
    {
        await connectMongoDB();
        const chat = await Users.findOne({username});
        let idx = chat.chats.messages.findIndex((c) => c._id == id);
        chat.chats.messages.splice(idx, 1);
        await chat.save();

        return NextResponse.json({message: "Pesan berhasil dihapus"});
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json(err);
    }
}