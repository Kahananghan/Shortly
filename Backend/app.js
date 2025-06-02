import express from "express"
import dotenv from "dotenv"
dotenv.config("./.env")
import connectDB from "./src/config/mongo.config.js"
import {nanoid} from "nanoid"
import urlschema from "./src/models/shorturlmodel.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/api/create', (req,res) => {
    const {url} = req.body
    const shorturl = nanoid(6)
    const newurl = new urlschema({
        full_url: url,
        short_url: nanoid(6)
    })
    newurl.save()
    res.send(shorturl)
})

app.get('/:id', async (req,res) => {
    const {id} = req.params
    const url = await urlschema.findOne({short_url: id})
    if(url){
        res.redirect(url.full_url)
    } else {
        res.status(404).send("Short URL not found")
    }})

app.listen(3000, ()=>{
    connectDB()
})