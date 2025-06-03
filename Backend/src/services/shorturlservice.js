import { genNanoId } from "../utils/helper.js"
import urlschema from '../models/shorturlmodel.js';
import tryCatch from "../utils/tryCatchHandler.js";


export const shorturlservice = async (url) => {
    const shorturl = genNanoId(7)
    if(!shorturl) throw new Error("short url not generated")
    const newurl = new urlschema({
        full_url: url,
        short_url: shorturl
    })
    await newurl.save()
    return shorturl
}