import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 256,
    },
    activation_link: {
        type: String,
    },
    activated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: [String],
        default: ["user"],
    },
    address: {
        type: String,
    },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

export default User;