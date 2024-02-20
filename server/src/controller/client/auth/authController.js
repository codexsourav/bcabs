// @ts-check
import { UsersDb } from "../../../db/models/client/usersSchems";
import { sendMail } from "../../../mail/SendMail";
import { verifyEmailT } from "../../../mail/templates/verifyEmailTemplate";
import { resetPasswordT } from "../../../mail/templates/restPasswordTemplate";

import { generateJwtToken } from "../../../utils/makeJWT";
import { getFutureTime, isFutureTime } from "../../../utils/time";
import { accountVerifyEmailT } from "../../../mail/templates/accountVerifyedTemplate";

export const signup = async (req, res) => {
    const { fullName, email, mobileNumber, password } = req.body;

    if (!fullName && !email && !mobileNumber) {
        return res.status(400).json({ message: 'Enter fullName, email, or mobileNumber must be provided' });
    }

    const existingUser = await UsersDb.findOne({ email });
    const existingMobileNumberUser = await UsersDb.findOne({ mobileNumber });

    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    if (existingMobileNumberUser) {
        return res.status(400).json({ message: 'Mobile already exists' });
    }
    const token = generateJwtToken({ fullName, email, mobileNumber });
    const newUser = new UsersDb({
        fullName,
        email,
        mobileNumber,
        password,
        tokens: {
            emailToken: {
                token,
                time: getFutureTime(30),
            }
        }
    });
    const user = await newUser.save();
    // @ts-ignore
    delete user._doc.tokens;
    // @ts-ignore
    delete user._doc.password;

    // @ts-ignore
    const userToken = generateJwtToken(user._doc);
    await sendMail(email, "Verify Your Email ID - BabagCabs", verifyEmailT(token));

    return res.status(201).json({ message: 'Account Create successfully', token: userToken });
}


export const login = async (req, res) => {
    const { identifier, password } = req.body;
    const user = await UsersDb.findOne({ $or: [{ email: identifier }, { mobileNumber: identifier }], password });
    if (!user) {
        return res.status(404).json({ message: 'Invalid Username Or Password' });
    }
    // @ts-ignore
    delete user._doc.password;
    // @ts-ignore
    const userToken = generateJwtToken(user._doc);
    res.status(200).json({ message: 'Login successful', token: userToken });
}


export const verify = async (req, res) => {
    const { token } = req.params;
    const user = await UsersDb.findOne({ "tokens.emailToken.token": token });
    if (!user) {
        return res.status(404).json({ message: 'Invalid Verification Link' });
    }
    if (user.isVerified) {
        return res.status(200).json({ message: 'Your Account Already Verified' });
    }
    const time = user?.tokens?.emailToken?.time;
    if (!isFutureTime(time)) {
        return res.status(404).json({ message: 'Invalid Verification Link' });
    }
    await UsersDb.updateOne({ "tokens.emailToken.token": token },
        {
            $set: { isVerified: true, tokens: {} },
        },
    );
    await sendMail((user.email || ""), "Your Account Successfully Verified - BabagCabs", accountVerifyEmailT());
    return res.status(200).json({ message: 'Your Account Successfully Verified' });
}


export const forgetPass = async (req, res) => {
    const { email } = req.params;
    const user = await UsersDb.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User Not Found On This Email' });
    }

    // @ts-ignore
    delete user._doc.password;

    // @ts-ignore
    delete user._doc.tokens

    // @ts-ignore
    const userToken = generateJwtToken(user._doc);
    await UsersDb.updateOne({ email }, {
        $set: {
            tokens: {
                forgetPassToken: {
                    token: userToken,
                    time: getFutureTime(30),
                }
            }
        }
    });


    await sendMail(email, "Reset Your Password - BabagCabs", resetPasswordT(userToken));
    return res.status(200).json({ message: 'Reset Password Email Send Successfully' });
}


export const changePass = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await UsersDb.findOne({ "tokens.forgetPassToken.token": token });
    if (!user) {
        return res.status(404).json({ message: 'Invalid Reset Password Link' });
    }

    const time = user?.tokens?.forgetPassToken?.time;
    if (!isFutureTime(time)) {
        return res.status(404).json({ message: 'Invalid Reset Password Link expired' });
    }
    await UsersDb.updateOne({ "tokens.forgetPassToken.token": token },
        {
            $set: { password, tokens: {} },
        },
    );
    return res.status(200).json({ message: 'Your Password Changed Successfully' });
}
