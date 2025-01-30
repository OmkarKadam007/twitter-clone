import mongoose from "mongoose";

const connectMongoDB=async() =>{
    try{
            const conn=await mongoose.connect(process.env.MONGO_URI)
            console.log(`mongo DB Connceted :${conn.connection.host}`);


    }catch(error)
    {
        console.log(`Error conction to mangodb  : ${error.message}`);
        process.exit(1);
    }   
}

export default connectMongoDB