import { getcustomshorturl, saveshorturl } from "../dao/saveshorturl.js";
import { genNanoId } from "../utils/helper.js";


export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = genNanoId(7);
    if (!shortUrl) throw new Error("Short URL not generated");

    const savedUrl = await saveshorturl(url, shortUrl);
    if (!savedUrl) throw new Error("Failed to save short URL");
    return shortUrl;
};


export const createShortUrlWithUser = async (url, userid, slug=null) => {
    let shortUrl;

    if(slug){
        const exist = await getcustomshorturl(slug);
        if (exist) throw new Error("This custom url already exists");
        shortUrl = slug;
    }else{
        shortUrl = genNanoId(7);
        if (!shortUrl) throw new Error("Short URL not generated");
    }

    console.log("Saving new short URL:", shortUrl);
    const savedUrl = await saveshorturl(url, shortUrl, userid);
    if (!savedUrl) throw new Error("Failed to save short URL");
    return shortUrl;
};