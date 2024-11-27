import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    desc: String,
    price: Number,
    base_price: Number,
    img: String,
    stock: Number,
    deletedAt: { type: Date, default: null },
});

export default mongoose.models.Products || mongoose.model("Products", productSchema);
