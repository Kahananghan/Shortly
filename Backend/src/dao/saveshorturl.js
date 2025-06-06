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
    await newurl.save()
    } catch(err){
    console.error("Error saving short URL", err)
}}

export const getcustomshorturl = async (slug) => {
    return await urlschema.findOne({short_url: slug})
}