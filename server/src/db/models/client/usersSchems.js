import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {
                return /\S+@\S+\.\S+/.test(value);
            },
            message: props => `invalid email address!`
        }
    },
    mobileNumber: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: props => `invalid mobile number!`
        }
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    tokens: {
        otpToken: {
            token: String,
            time: Date,
        },
        emailToken: {
            token: String,
            time: Date,
        },
        forgetPassToken: {
            token: String,
            time: Date,
        },
    }
});

export const UsersDb = mongoose.model('Users', userSchema);

