import urlschema from '../models/shorturlmodel.js';

export const saveshorturl = async (fullurl, shorturl, userid) => {
    try{
        const newurl = new urlschema({
        full_url: fullurl,
        short_url: shorturl,
        })
        if(userid){
            newurl.user = userid
        }
        const savedUrl = await newurl.save()
        return savedUrl;
    } 
    catch(err){
    console.error("Error saving short URL", err)

    if (err.code === 11000) {
            throw new Error("This custom url already exists");
        }
        
    throw err;
}}

export const getcustomshorturl = async (slug) => {
    const result = await urlschema.findOne({short_url: slug})
    return result;
}