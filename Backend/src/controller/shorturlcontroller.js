import { createShortUrlWithoutUser, createShortUrlWithUser} from "../services/shorturlservice.js"
import urlschema from '../models/shorturlmodel.js'; 
import tryCatch from "../utils/tryCatchHandler.js";

export const createshorturl = tryCatch(async (req,res) => {
    const {url, slug} = req.body
    let shorturl;
    if(req.user){
        shorturl = await createShortUrlWithUser(url, req.user._id, slug)
    }else{
        shorturl = await createShortUrlWithoutUser(url)
    }
    
    res.status(200).json({ shorturl: process.env.APP_URI + shorturl})
})

export const redirectfromshorturl = tryCatch(async (req,res) => {
    const {id} = req.params
    const url = await urlschema.findOneAndUpdate({short_url: id}, {$inc: {clicks:1}})
    if(url){
        res.redirect(url.full_url)
    } else {
        res.status(404).send("Short URL not found")
    }
})