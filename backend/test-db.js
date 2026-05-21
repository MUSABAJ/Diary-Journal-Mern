import dotenv from 'dotenv';
import connectDB from './src/config/database.js';

dotenv.config();

const testConnection = async () => {
  console.log('🔄 Testing MongoDB Atlas connection...');
  await connectDB();
  console.log('✅ Connection successful! Your database is ready.');
  process.exit(0);
};

testConnection();