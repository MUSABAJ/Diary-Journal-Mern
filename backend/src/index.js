import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import entryRoutes from './routes/entryRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5000',
  credentials: true, // Required to send/receive cookies cross-origin
}));

app.use(express.json());       // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // ← Optional: parses form data
app.use(cookieParser());       // Parse cookies so req.cookies.jwt works

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/settings',settingsRoutes)
app.get('/', (req, res) => {
  res.json({
    message: 'Journal API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      entries: '/api/entries',
      users: '/api/users'
    },
    documentation: 'Use Postman or your frontend to interact with the API'
  });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));