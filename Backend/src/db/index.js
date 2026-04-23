import mongoose from "mongoose";


const connectDB = async () => {
    try{
       const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
       console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    //    console.log(connectionInstance);
    } catch(err){
        console.error("MONGODB Connection Error" ,err);
        process.exit(1);
    }
}

export default connectDB