// pages/api/getCatalogProduct.js
import connectMongoDB from "../../../../database/connectDB";
import Products from "@/models/Products";

export async function GET(req) {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const minPrice = parseInt(searchParams.get("minPrice"), 10) || 0;
    const maxPrice = parseInt(searchParams.get("maxPrice"), 10) || Number.MAX_SAFE_INTEGER;

    try {
        const products = await Products.find({
            productName: { $regex: search, $options: "i" },
            price: { $gte: minPrice, $lte: maxPrice }
        });

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
