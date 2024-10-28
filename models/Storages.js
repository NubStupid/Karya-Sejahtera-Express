import mongoose, { Schema } from "mongoose";

const storageSchema = new Schema({
    username: {type: String, required: true},
    nama: {type: String}
})

const Storages = mongoose.models.Storages || mongoose.model("Storages", storageSchema)

export default Storages