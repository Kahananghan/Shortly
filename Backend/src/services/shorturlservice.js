import { getcustomshorturl, saveshorturl } from "../dao/saveshorturl.js";
import { genNanoId } from "../utils/helper.js"


export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = genNanoId(7);
    if (!shortUrl) throw new Error("Short URL not generated");

    await saveshorturl(url, shortUrl);
    return shortUrl;
};


export const createShortUrlWithUser = async (url, userid, slug=null) => {
    const shortUrl = slug || genNanoId(7);
    if(slug){
        const exist = await getcustomshorturl(slug);
        if (exist) throw new Error("This custom url already exists");
    }
    console.log("Saving new short URL:", shortUrl);
    await saveshorturl(url, shortUrl, userid);
    return shortUrl;
};