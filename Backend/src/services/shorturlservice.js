import { genNanoId } from "../utils/helper.js"
import urlschema from '../models/shorturlmodel.js';

export const shorturlservice = (url) => {
    const shorturl = genNanoId(7)
    const newurl = new urlschema({
        full_url: url,
        short_url: shorturl
    })
    newurl.save()
    return shorturl
}