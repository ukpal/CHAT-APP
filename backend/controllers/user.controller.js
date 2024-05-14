import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.userId;
        const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")
        res.status(200).json(allUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}