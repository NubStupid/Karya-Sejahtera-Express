import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    username: {type: String, required: true},
    nama: {type: String}
})

const Transactions = mongoose.models.Transactions || mongoose.model("Transactions", transactionSchema)

export default Transactions