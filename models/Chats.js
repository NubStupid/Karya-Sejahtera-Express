import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
    username: {type: String, required: true},
    message: {type: Array}
})

const Chats = mongoose.models.Chats || mongoose.model("Chats", chatSchema)

export default Chats