import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./Routes/authRoute.js"

import cookieParser from "cookie-parser"
import incidentRoutes from "./Routes/incidentsRoutes.js"

dotenv.config()

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err.message)) 


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors(
    {
        origin: ["http://127.0.0.1:5173", "http://localhost:3000"],
        credentials: true, 
    
    }
))

const port = process.env.PORT || 5000;
 

app.use("/api/auth", authRoute) 
app.use('/api/incidents',incidentRoutes)


app.listen(port, () => console.log(`server listening on port :${port}`))
