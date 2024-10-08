import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Token = mongoose.model("token", tokenSchema);

export default Token;