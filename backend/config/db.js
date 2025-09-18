import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://saipreetysutar2315:resume123@cluster0.ew8lhla.mongodb.net/RESUME')
    .then(() => console.log('DB CONNECTED'))
}