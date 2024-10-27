import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    username: {type: String, required: true},
    nama: {type: String}
})

const Products = mongoose.models.Products || mongoose.model("Products", productSchema)

export default Products