// /pages/api/products/[id].js
import connectMongoDB from "../../../../database/connectDB";
import Products from "../../../../models/Products";

export async function GET(req, { params }) {
    await connectMongoDB();
    const { id } = params; 

    try {
        const product = await Products.findOne({ productId: id }).exec();
        if (!product) {
            return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
        }

        const keywords = product.productName.split(" ");
        const relatedProducts = await Products.find({
            productId: { $ne: id },
            productName: { $regex: new RegExp(keywords.join("|"), "i") },
        }).limit(4).exec();

        return new Response(
            JSON.stringify({ product, relatedProducts }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch product details" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
