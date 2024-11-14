import { NextResponse } from "next/server";
import connectMongoDB from "../../../../database/connectDB";
import Products from "../../../../models/Products";

export async function GET(req){
    try {
        await connectMongoDB()
        const products = await Products.find({ deletedAt: null }).exec()
        return NextResponse.json(products, {status: 200})
    } catch (error) {
        return NextResponse.json('error', {status: 400})
    }
}

export async function POST(req) {
    try {
        await connectMongoDB();
        const data = await req.json();
        console.log("Data received:", data);
        const { productName, desc, price, img, stock } = data
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

export async function DELETE(req) {
    try {
        const { productId } = await req.json();
        await connectMongoDB();
        const deletedProduct = await Products.updateOne(
            {productId},
            { $set: { deletedAt: new Date() } }
        );

        if (!deletedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting product", error: error.message }, { status: 400 });
    }
}

export async function PUT(req) {
    try {
        const { productId, productName, price, stock, desc } = await req.json();
        await connectMongoDB();
        const updatedProduct = await Products.updateOne(
            {productId},
            { 
                $set: { 
                    productName: productName,
                    price: price,
                    stock: stock,
                    desc: desc
                } 
            }
        );

        if (!updatedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating product", error: error.message }, { status: 400 });
    }
}

