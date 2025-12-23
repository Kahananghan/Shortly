import { findUserById } from "../dao/user.dao.js"
import { verifyToken } from "./helper.js"

export const userAttach = async (req, res, next) => {
    const token = req.cookies.token
        if(!token) return next()
    
        try{
            const decoded = verifyToken(token)
            const user = await findUserById(decoded)
            if(!user) return next() 
            req.user = user
            next()
        }catch(error){
            console.log(error)
            next()
        }
    }