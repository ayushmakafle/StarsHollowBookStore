import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDb ${conn.connection.host}`.underline.yellow)

    }catch(error){
        console.log(`Error in mongodb ${error}`.bgRed.white);
    }
};

export default connectDB;