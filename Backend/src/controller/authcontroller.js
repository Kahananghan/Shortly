import { cookieOptions } from "../config/config.js"
import { login_user_service, register_user_service } from "../services/authservice.js"
import tryCatch from "../utils/tryCatchHandler.js"

export const register_user = tryCatch (async (req,res) => {
    let { name, email, password } = req.body
    const token = await register_user_service(name, email, password)
    res.cookie('auth-token', token, cookieOptions)  
    res.status(200).json({message: 'register successful'})
})

export const login_user = tryCatch (async (req,res) => {
    let { email, password } = req.body
    const token = await login_user_service(email, password)
    res.cookie('auth-token', token, cookieOptions)
    res.status(200).json({message: 'login successful'})
})