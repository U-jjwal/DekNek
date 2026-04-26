import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (err) {
        console.error("MONGODB Connection Error", err);
        process.exit(1);
    }
}

export default connectDB;