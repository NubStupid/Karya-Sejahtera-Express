import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true},
    nama: {type: String}
})

const Users = mongoose.models.Users || mongoose.model("Users", userSchema)

export default Users