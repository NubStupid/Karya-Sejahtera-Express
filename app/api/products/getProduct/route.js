// pages/api/products/index.js
import connectMongoDB from "../../../../database/connectDB";
import Products from "../../../../models/Products";

export async function GET(req) {
    try {
        await connectMongoDB(); 
        const products = await Products.find().exec();
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
