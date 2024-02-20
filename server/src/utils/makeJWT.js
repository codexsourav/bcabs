import jwt from "jsonwebtoken";

const JWT_SECRET = 'your_jwt_secret';

export const generateJwtToken = (user) => {
    const options = {
        expiresIn: '60d'
    };
    const token = jwt.sign(user, JWT_SECRET, options);
    return token;
};

export const verifyJwtToken = async (token) => {
    try {
        const res = await jwt.verify(token, JWT_SECRET);
        return res;
    } catch (error) {
        throw error;
    }
};