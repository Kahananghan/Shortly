import express from "express"
import dotenv from "dotenv"
dotenv.config("./.env")
import connectDB from "./src/config/mongo.config.js"
import urlschema from "./src/models/shorturlmodel.js"
import shorturlroute from './src/routes/shorturlroute.js'
import { redirectfromshorturl } from "./src/controller/shorturlcontroller.js"
import errorHandler from "./src/utils/errorHandler.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/create', shorturlroute)

app.get('/:id', redirectfromshorturl)

app.use(errorHandler)

app.listen(3000, ()=>{
    connectDB()
})