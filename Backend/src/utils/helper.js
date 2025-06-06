import { nanoid } from "nanoid"
import jwt from 'jsonwebtoken'
export const genNanoId = (length) => {
    return nanoid(length)
}
export const  signtoken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
}

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.id;
}