import jwt from "jsonwebtoken"

export const generateTokenandSetCookie = (userId, res) => {

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    return token;

} 