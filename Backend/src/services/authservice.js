import { createUser, findUserByEmail } from '../dao/user.dao.js'
import { signtoken } from '../utils/helper.js'


export const register_user_service = async (name, email, password) => { 
    const user = await findUserByEmail(email)
    if(user) throw new Error('User already exists')
    const newUser = await createUser(name, email, password)
    const token = signtoken({id : newUser._id})
    return {token, user: newUser};
}

export const login_user_service = async (email, password) => { 
    const user = await findUserByEmail(email)
    if(!user || user.password != password ) throw new Error('Invalid credentials')
    const token = signtoken({id : user._id})
    return {token,user};
}