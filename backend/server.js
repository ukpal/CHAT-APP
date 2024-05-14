import express from "express"
import dotenv from "dotenv"
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import dbConnection from "./db/connection.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

// app.use('/',(req,res)=>res.json("hello world"))
app.use('/api/auth', authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)

app.listen(PORT, () => {
    dbConnection()
    console.log(`server is running on port:${PORT}`)
})