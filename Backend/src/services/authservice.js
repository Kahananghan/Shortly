import { createUser, findUserByEmail } from '../dao/user.dao.js'
import { signtoken } from '../utils/helper.js'
import { validateEmail, validatePassword } from '../utils/validation.js'


export const register_user_service = async (name, email, password) => {
    
    validateEmail(email);
    validatePassword(password);
    
    if (!name || name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
    }
    
    const user = await findUserByEmail(email)
    if(user) throw new Error('User already exists')
    const newUser = await createUser(name.trim(), email.toLowerCase(), password)
    const token = signtoken({id : newUser._id})
    return {token, user: newUser};
}

export const login_user_service = async (email, password) => {
    
    validateEmail(email);
    validatePassword(password);
    
    const user = await findUserByEmail(email.toLowerCase())
    if(!user) throw new Error('Invalid credentials')
    
    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid) throw new Error('Invalid credentials')
    
    const token = signtoken({id : user._id})
    return {token, user};
}