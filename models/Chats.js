// import mongoose, { Schema } from "mongoose";

// const chatSchema = new Schema({
//     username: {type: String, required: true},
//     messages: [
//         {
//             sender: {type: String, required: true},
//             message: {type: String, required: true},
//             timestamp: {type: Date, required: true},
//             read: {type: Boolean, required: true},
//             delivered: {type: Boolean, required: true}
//         }
//     ],
//     updatedAt: {type: Date, default: null}
// })

// const Chats = mongoose.models.Chats || mongoose.model("Chats", chatSchema)

// export default Chats