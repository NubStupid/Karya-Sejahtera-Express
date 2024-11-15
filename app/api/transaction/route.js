import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";
import Transactions from "@/models/Transactions";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
})

export async function POST(request) {
    try {
        const { totalPrice } = await request.json();

        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        let id;
        let isUnique = false;

        while (!isUnique) {
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            id = `TR${day}${month}${year}${randomNumber}`;
            
            const existingTransaction = await Transactions.findOne({ transId: id });
            if (!existingTransaction) {
                isUnique = true;
            }
        }

        let parameter = {
            transaction_details: {
                order_id: id,
                gross_amount: totalPrice
            }
        };

        // return NextResponse.json({ id: id });
        const token = await snap.createTransactionToken(parameter)
        console.log(token);
        return NextResponse.json({token})
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}