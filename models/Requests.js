import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema({
    username: {type: String, required: true},
    nama: {type: String}
})

const Requests = mongoose.models.Requests || mongoose.model("Requests", requestSchema)

export default Requests