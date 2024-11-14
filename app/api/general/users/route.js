import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

// export async function POST(request) {
//     try {
//         await connectMongoDB();

//         const data = await request.json();
//         console.log(data);
//         const user = new Users(data);
//         await user.save();

//         return NextResponse.json({ success: true, data: user });
//     } catch (error) {
//         return NextResponse.json({ success: false, message: error.message });
//     }
// }

export async function GET(request) {
    try {
        await connectMongoDB();

        const users = await Users.find({role: { $ne: "admin" }});

        // if (!user) {
        //     return NextResponse.json({ success: false, message: 'Invalid username or password' });
        // }

        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}