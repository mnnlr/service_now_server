import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
    ,
    role: {
        type: String, enum: ['admin', 'it_staff', 'employee'],
        default: 'employee'
    },
    department: { type: String },
}, { timestamps: true })

export const user = mongoose.model("user", userSchema);