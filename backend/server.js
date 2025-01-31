import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js'
 
import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMonoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const PORT = process.env.PORT || 5000;

console.log(`PORT value: ${PORT}`); // Log the PORT value

app.use(express.json()); // to parse request body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB().then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
});
