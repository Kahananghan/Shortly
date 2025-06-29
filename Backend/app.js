import express from "express"
import dotenv from "dotenv"
dotenv.config("./.env")
import cors from "cors"
import mongoose from "mongoose"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import connectDB from "./src/config/mongo.config.js"

mongoose.set('bufferCommands', false)
import authroute from './src/routes/authroute.js'
import shorturlroute from './src/routes/shorturlroute.js'
import { redirectfromshorturl } from "./src/controller/shorturlcontroller.js"
import errorHandler from "./src/utils/errorHandler.js"
import cookieParser from "cookie-parser"
import userroute from "./src/routes/userroute.js"
import googleAuthRoute from './src/routes/googleAuth.js'

const app = express()

// Security middleware
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "https://accounts.google.com", "https://apis.google.com"],
            frameSrc: ["https://accounts.google.com"],
            connectSrc: ["'self'", "https://accounts.google.com", "https://oauth2.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}))

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
})

const createUrlLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // limit each IP to 20 URL creations per windowMs
    message: 'Too many URLs created from this IP, please try again later.',
})

app.use(limiter)

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            process.env.FRONTEND_URI,
            'http://localhost:5173', // Local development
            'http://localhost:3000', // Local development
            'https://shortly-kahan.vercel.app' // Production frontend
        ].filter(Boolean); 

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            console.log('Allowed origins:', allowedOrigins);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Origin', 'Referer', 'X-Requested-With'],
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions))

// Headers for Google Sign-In
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Shortly API is running',
    environment: process.env.NODE_ENV || 'development',
    frontendUri: process.env.FRONTEND_URI
  })
})
app.use('/api/auth', authroute)
app.use('/api/auth', googleAuthRoute)
app.use('/api/create', createUrlLimiter, shorturlroute)
app.use('/api/url', shorturlroute)
app.use('/api/user', userroute)
app.get('/:id', redirectfromshorturl)
app.use(errorHandler)

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`📊 Database connected`);
    });
}).catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});