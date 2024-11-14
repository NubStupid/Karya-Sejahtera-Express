import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema({
    reqId:{type:String,required:true},
    username: {type: String},
    products: {type: Array},
    grandTotal:{type:Number},
    createdAt:{type:Date},
    notes:{type:String}

})

const Requests = mongoose.models.Requests || mongoose.model("Requests", requestSchema)

export default Requests