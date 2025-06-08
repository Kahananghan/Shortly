import usermodel from '../models/usermodel.js'
import urlSchema from '../models/shorturlmodel.js';

export const findUserByEmail = async (email) => {
    return await usermodel.findOne({ email })
}

export const findUserById = async (id) => {
    return await usermodel.findById(id)
    
}

export const createUser = async (name, email, password) => {
    const newUser = new usermodel({ name, email, password });
    await newUser.save();
    return newUser;
};

export const getshorturl = async (id) => {
    return await urlSchema.find({user: id})
}
