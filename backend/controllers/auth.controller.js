import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        if (password != confirmPassword) {
            return res.status(400).json({ error: "passwords don't match" })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: "username already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePicture: gender == 'male' ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePicture: newUser.profilePicture
            })
        } else {
            return res.status(400).json({ error: "Invalid user data" })
        }
    } catch (error) {
        console.log("Error in signup: ", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }
        generateTokenAndSetCookie(user._id,res);
        return res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture
        })

    } catch (error) {
        console.log("Error in login: ", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        return res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout: ", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}