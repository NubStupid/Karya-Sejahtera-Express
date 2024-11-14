import { NextResponse } from "next/server";
import connectMongoDB from "../../../../database/connectDB";
import Users from "../../../../models/Users";

export async function GET(req){
    try {
        await connectMongoDB()
        const users = await Users.find().exec()
        return NextResponse.json(users, {status: 200})
    } catch (error) {
        console.error(error.message)
        return NextResponse.json(error, {status: 400})
    }
}

export async function PUT(req){
    try {
        const {username} = await req.json()
        await connectMongoDB()
        const user = await Users.findOne({username})
        console.log(user);
        let bannedUsers
        if(user.active){
            console.log('user active');
            bannedUsers = await Users.updateOne(
                {username: username},
                { $set: {active: false}}
            )
        }
        else{
            bannedUsers = await Users.updateOne(
                {username, username},
                { $set: {active: true}}
            )
        }

        if(!bannedUsers){
            return NextResponse.json({message: 'User not found'}, {status: 404})
        }

        return NextResponse.json({message: 'User banned successfully'}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({ message: "Error banning user", error: error.message }, { status: 400 });
    }
}