import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body
        
        if(!username || !fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        
        // check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        
        if(existingUser) return res.status(400).json({ message: "User already exists" })
            
            //hash password
            const hashPassword = await bcrypt.hash(password, 10)
            
        
        // create user
        const user = await User.create({
            username,
            fullname,
            email,
            password: hashPassword,
        })

        // create token
        const token = jwt.sign({
            id: user._id,
            email: user.email, 
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(201).json({
            message: "User registered successfully",
            data: { user, token }
        })
        
        
        
    } catch (err) {
        console.log("Registration error:", err);
        res.status(500).json({ message: "Error registering user" })
    }
}


export const loginUser = async (req, res) => {
    try{

        const { email, password } = req.body

        if(!email || !password) return res.status(400).json({ message: "All fields are required" })
        const user = await User.findOne({ email: email }).select("+password")
        
        if(!user) return res.status(400).json({ message: "Invalid email or password"})
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        

        if(!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" })

        const token = jwt.sign({
            id: user._id,
            email: user.email, 
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(200).json({
            message: "User logged in successFully",
            data: { user, token }
        })
        
    } catch (err) {
        res.status(500).json({ message: "Error logging in user "})
    }
}

export const logoutUser = async (req, res) => {
    try{
        res.clearCookie("token")
        res.status(200).json({ message: "User logged out successfully" })
    } catch (err) {
        res.status(500).json({ message: "Error logging out user" })
    }
}

export const userProfile = async (req, res) => {
    try {

        res.status(200).json({ data: req.user })
        
    } catch (err) {
        res.status(500).json({ message: "Error fetching user profile" })
    }
}