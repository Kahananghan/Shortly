import mongoose from "mongoose"

// Disable mongoose buffering for serverless environments
mongoose.set('bufferCommands', false);

// Global connection variable to reuse connections
let cachedConnection = null;

const connectDB = async () => {
  try {
    // Return cached connection if available
    if (cachedConnection && mongoose.connection.readyState === 1) {
      console.log('✅ Using cached MongoDB connection');
      return cachedConnection;
    }

    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log('✅ MongoDB already connected');
      cachedConnection = mongoose.connection;
      return mongoose.connection;
    }

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    console.log('🔄 Attempting to connect to MongoDB...');

    // Serverless-optimized options
    const options = {
      serverSelectionTimeoutMS: 5000, // 5 seconds
      socketTimeoutMS: 10000, // 10 seconds
      connectTimeoutMS: 5000, // 5 seconds
      maxPoolSize: 1, // Single connection
      bufferCommands: false, // Disable buffering
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(`📍 Database: ${conn.connection.name}`);

    // Cache the connection
    cachedConnection = conn.connection;
    return conn.connection;

  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);

    // Reset cached connection on error
    cachedConnection = null;

    // Don't exit in production/serverless
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw err;
  }
};

export default connectDB;
