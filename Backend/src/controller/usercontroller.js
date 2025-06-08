import { getshorturl } from "../dao/user.dao.js"
import tryCatch from "../utils/tryCatchHandler.js"

export const getallusersurl = tryCatch (async (req, res) => {
    const { _id } = req.user
    const urls = await getshorturl(_id)
    const formattedUrls = urls.map(url => {
        const urlObj = url.toObject()
        return {
            ...urlObj,
            short_url: process.env.APP_URI + urlObj.short_url
        }
    })
    res.status(200).json({message: "success", urls: formattedUrls})
 })
