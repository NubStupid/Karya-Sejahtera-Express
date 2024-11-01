import mongoose, { Schema } from "mongoose";

const productDistributorSchema = new Schema({
    productDId: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    productName: {type: String, required: true},
    desc: {type: String, required: true, maxLength: 200},
    price: {type: Number, required: true},
    img: {type: String, required: true},
    deletedAt: {type: Date}
})

const ProductDistributors = mongoose.models.ProductDistributors || mongoose.model("ProductDistributors", productDistributorSchema)

export default ProductDistributors