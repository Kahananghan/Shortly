import usermodel from '../models/usermodel.js'

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


