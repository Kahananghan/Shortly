import { cookieOptions } from "../config/config.js"
import { login_user_service, register_user_service } from "../services/authservice.js"
import tryCatch from "../utils/tryCatchHandler.js"

export const register_user = tryCatch (async (req,res) => {
    let { name, email, password } = req.body
    const {token, user} = await register_user_service(name, email, password)
    req.user = user
    res.cookie('token', token, cookieOptions)  
    res.status(200).json({user:user, message: 'register successful'})
})

export const login_user = tryCatch (async (req,res) => {
    let { email, password } = req.body
    const {token, user} = await login_user_service(email, password)
    req.user = user
    res.cookie('token', token, cookieOptions)
    res.status(200).json({user:user, message: 'login successful'})
})

export const logout_user = tryCatch(async (req, res) => {
    res.clearCookie('token', cookieOptions)
    res.status(200).json({message: 'logout successful'})
})

export const get_user = tryCatch(async (req, res) => {
    res.status(200).json({user: req.user})
})