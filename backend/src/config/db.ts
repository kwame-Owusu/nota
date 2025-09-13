import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export async function connectDB() {
    try {
        mongoose.connect(process.env.mongoConnectionUrl as string)
        console.log("Mongo DB connected successfully");
    } catch (err) {
        console.log("Error occured connecting to DB: ", err);
    }
}