import mongoose from "mongoose";
// @ts-check
const adminUserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'viewer'],
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const AdminUser = mongoose.model('AdminUsers', adminUserSchema);


