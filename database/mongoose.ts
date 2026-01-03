import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
declare global {
    var mongooseCache:{
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}
let cached = global.mongooseCache;

// We dont want to create a new connection everytime, we want to reuse the connection
if (!cached){
    cached = global.mongooseCache = {conn: null, promise:null};
}

export const connectToDatabase = async () => {
    // checking to see if we have access to the mongoDB URI
    if(!MONGODB_URI){
        throw new Error("MongoDB URI must be set within .env");
    }
    //return cached connection if it exists
    if (cached.conn) return cached.conn;

    // We need to set the cached promise to mongoose.connect if it doesn't exist
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false});
    }
    //if we either get the cached connection or promise or try to connect for the first time
    try {
        cached.conn = await cached.promise;

    } catch(err){
        cached.promise = null;
        throw err;
    }
    console.log(`Connected to database: ${process.env.MONGODB_URI} - ${MONGODB_URI}`);

    return cached.conn;
}