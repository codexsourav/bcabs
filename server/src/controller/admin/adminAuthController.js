import { AdminUser } from '../../db/models/admin/adminUserSchema';
import { generateJwtToken } from '../../utils/makeJWT';
// @ts-check
export const adminAuthLogin = async (req, res) => {
    const { username, pass } = req.body;

    const user = await AdminUser.findOne({
        $or: [{ username: username }, { email: username }]
    });

    if (!user) {
        return res.status(404).json({ message: "Invalid username or Password" });
    }

    if (user.password !== pass) {
        return res.status(401).json({ message: "Invalid username or Password 2" });
    }
    delete user._doc.password;

    const token = generateJwtToken(user._doc);
    user._doc['token'] = token;
    user._doc['message'] = "Login Successful";

    res.status(200).json(user);
}