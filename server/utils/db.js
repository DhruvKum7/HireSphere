import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://chandanchand769:chandanchand769@cluster0.hfwz0.mongodb.net/');
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
        console.log("mongo db conntion error")
    }
}
export default connectDB;