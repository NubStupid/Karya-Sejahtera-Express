import { NextResponse } from "next/server";
import connectMongoDB from "../../../../database/connectDB";
import Products from "../../../../models/Products";

export async function GET(req){
    try {
        await connectMongoDB()
        const products = await Products.find().exec()
        return NextResponse.json(products, {status: 200})
    } catch (error) {
        return NextResponse.json('error', {status: 400})
    }
}

export async function POST(req) {
    await connectMongoDB();
    try {
        const data = await req.json();
        console.log("Data received:", data);
        const { productName, desc, price, img, stock } = data;

        if (!productName || !desc || !price || !img || !stock) {
            return new Response(JSON.stringify({ error: "All fields are required" }), {
                status: 400,
            });
        }

        const productCount = await Products.countDocuments();

        const productId = "PR" + String(productCount + 1).padStart(3, "0");

        const newProduct = new Products({
            productId,
            productName,
            desc,
            price,
            img,
            stock,
        });

        await newProduct.save();

        return new Response(JSON.stringify({ success: true, product: newProduct }), {
            status: 201,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        return new Response(JSON.stringify({ error: "Failed to add product" }), {
            status: 500,
        });
    }
}