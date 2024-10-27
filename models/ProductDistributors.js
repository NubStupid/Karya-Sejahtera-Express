import mongoose, { Schema } from "mongoose";

const productDistributorSchema = new Schema({
    username: {type: String, required: true},
    nama: {type: String}
})

const ProductDistributors = mongoose.models.ProductDistributors || mongoose.model("ProductDistributors", productDistributorSchema)

export default ProductDistributors