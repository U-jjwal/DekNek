import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).json({ message: "Unauthorized" })


        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id)

        if (!user) return res.status(401).json({ message: "Unauthorized" })

        req.user = user

        next()


    } catch (err) {
        res.status(401).json({ message: "Unauthorized" })
    }
}
