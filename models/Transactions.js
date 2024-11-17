import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    transId: { type: String, required: true },
    username: { type: String, required: true },
    products: [
        {
            productId: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            basePrice: { type: Number, required: true },
            subtotal: { type: Number, required: true },
        },
    ],
    grandTotal: { type: Number, required: true },
    payment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["Success", "Pending", "Failed"], required: true },
});

const Transactions = mongoose.models.Transactions || mongoose.model("Transactions", transactionSchema);

export default Transactions;