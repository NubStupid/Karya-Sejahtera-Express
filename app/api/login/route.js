import connectMongoDB from "@/database/connectDB";
import Users from "@/models/Users";
// import Chats from "@/models/Chats";
// import Products from "@/models/Products";
// import Requests from "@/models/Requests";
// import ProductDistributors from "@/models/ProductDistributors";
// import Transactions from "@/models/Transactions";
// import Storages from "@/models/Storages";
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

export async function POST(request) {
    try {
        await connectMongoDB();
        const data = await request.json();

        let username = data.username
        let password = data.password

        const user = await Users.findOne({ username, password });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid username or password' });
        }

        return NextResponse.json({ success: true, message: 'Login successful', data: user });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}