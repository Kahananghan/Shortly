import { createShortUrlWithoutUser, createShortUrlWithUser} from "../services/shorturlservice.js"
import urlschema from '../models/shorturlmodel.js';
import tryCatch from "../utils/tryCatchHandler.js";
import { validateUrl, validateSlug } from "../utils/validation.js";

export const createshorturl = tryCatch(async (req,res) => {
    const {url, slug} = req.body

    const formattedUrl = validateUrl(url);
    validateSlug(slug);
    
    let shorturl;
    if(req.user){
        shorturl = await createShortUrlWithUser(formattedUrl, req.user._id, slug)
    }else{
        shorturl = await createShortUrlWithoutUser(formattedUrl)
    }

    res.status(200).json({ shorturl: process.env.APP_URI + shorturl})
})

export const deleteShortUrl = tryCatch(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const url = await urlschema.findOne({ _id: id, user: userId });

    if (!url) {
        return res.status(404).json({ message: "URL not found or you don't have permission to delete it" });
    }

    await urlschema.findByIdAndDelete(id);
    res.status(200).json({ message: "URL deleted successfully" });
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