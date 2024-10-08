import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
}, { timestamps: true });

const Brand = mongoose.model("brand", brandSchema);

export default Brand;