import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    code:{type:String},
    imageUrl: { type: String },
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
});

export const Code = mongoose.models?.Code || mongoose.model("Code",codeSchema);