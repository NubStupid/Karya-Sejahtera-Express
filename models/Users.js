import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    profile: {
        name: {type: String, required: true},
        profpic: {type: String, required: false},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true},
    },
    cart: [{
        productId: {type: String, required: true},
        qty: {type: Number, required: true}
    }],
    totalPrice: {type: Number, required: true, default: 0},
    chats: {
        messages: [
            {
                sender: {type: String, required: true},
                message: {type: String, required: true},
                timestamp: {type: Date, required: true},
                read: {type: Boolean, required: true},
                delivered: {type: Boolean, required: true}
            }
        ],
        updatedAt: {type: Date, default: null}
    },
    active: {type: Boolean, required: true}
})

const Users = mongoose.models.Users || mongoose.model("Users", userSchema)

export default Users