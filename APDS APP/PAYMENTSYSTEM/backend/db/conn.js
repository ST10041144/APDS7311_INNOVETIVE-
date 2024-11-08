import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI
const ATLAS_URI = process.env.ATLAS_URI

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected to ${MONGO_URI}`);
    } catch (err) {
        console.error(`Failed to connect to MONGO_URI: ${err.message}`);
        console.log('Attempting to connect to ATLAS_URI...');
        try {
            await mongoose.connect(ATLAS_URI);
            console.log(`MongoDB connected to ${ATLAS_URI}`);
        } catch (err) {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        }
    }
};

export default connectDB;