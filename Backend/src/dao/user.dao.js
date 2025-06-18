import usermodel from '../models/usermodel.js'
import urlSchema from '../models/shorturlmodel.js';
import mongoose from 'mongoose';
import connectDB from '../config/mongo.config.js';

// Ensure connection before database operations
const ensureConnection = async () => {
    if (mongoose.connection.readyState !== 1) {
        console.log('🔄 Ensuring database connection...');
        await connectDB();
    }
};

export const findUserByEmail = async (email) => {
    await ensureConnection();
    return await usermodel.findOne({ email })
}

export const findUserById = async (id) => {
    await ensureConnection();
    return await usermodel.findById(id)
}

export const createUser = async (name, email, password) => {
    await ensureConnection();
    const newUser = new usermodel({ name, email, password });
    await newUser.save();
    return newUser;
};

export const getshorturl = async (id) => {
    await ensureConnection();
    return await urlSchema.find({user: id})
}
