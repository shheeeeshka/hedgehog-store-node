import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
}, { timestamps: true });

const Type = mongoose.model("type", typeSchema);

export default Type;