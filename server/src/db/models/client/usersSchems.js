import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tokens: {
        otpToken: {
            token: string,
            time: Date,
        },
        emailToken: {
            token: string,
            time: Date,
        },
        forgetPassToken: {
            token: string,
            time: Date,
        },
    }
});

export const UsersDb = mongoose.model('Users', userSchema);

