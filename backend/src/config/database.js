import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
  console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Kill the process if DB fails — no point running without it
  }
};

export default connectDB;