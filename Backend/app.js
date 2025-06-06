import express from "express"
import dotenv from "dotenv"
dotenv.config("./.env")
import cors from "cors"
import connectDB from "./src/config/mongo.config.js"
import authroute from './src/routes/authroute.js'
import shorturlroute from './src/routes/shorturlroute.js'
import { redirectfromshorturl } from "./src/controller/shorturlcontroller.js"
import errorHandler from "./src/utils/errorHandler.js"
import cookieParser from "cookie-parser"
import { userAttach } from "./src/utils/Attachuser.js"
import { authmiddleware } from "./src/middleware/authmiddleware.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/auth', authroute)
app.use('/api/create', shorturlroute)
app.get('/:id', redirectfromshorturl)
//app.use(userAttach)
app.use(authmiddleware)
app.use(errorHandler)

app.listen(3000, ()=>{
    connectDB()
})