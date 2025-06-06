import { findUserById } from "../dao/user.dao.js"
import { verifyToken } from "../utils/helper.js"

export const authmiddleware = async (req, res, next) => {
    const token = req.cookies.token
    if(!token) return res.status(401).json({error: 'You are not authenticated'})

    try{
        const decoded = verifyToken(token)
        const user = await findUserById(decoded)
        if(!user) return res.status(401).json({error: 'You are not authenticated'})
        req.user = user
        next()
    }catch(error){
        return res.status(401).json({error: 'You are not authenticated'})
    }
}