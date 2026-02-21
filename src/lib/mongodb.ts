import mongoose from "mongoose";

// Database name for the connection
const DB_NAME = "asadiqbalprofile";


const cached =
  globalThis.mongoose ?? (globalThis.mongoose = { conn: null, promise: null });

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI ?? "";

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: DB_NAME,
      // MongoDB Atlas specific options for better performance
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log(`Connected to MongoDB database: ${DB_NAME}`);
      return m;
    });
  }


  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
