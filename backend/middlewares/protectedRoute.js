import jwt from 'jsonwebtoken';

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - invalid token" });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in protectedRoute middleware: ", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export default protectedRoute;