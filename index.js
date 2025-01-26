import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import beneficiaryRoutes from './routes/beneficiaryRoutes.js';
import userRoutes from "./routes/userRoutes.js"; 
import connectDB from './config/database.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/beneficiary', beneficiaryRoutes);
app.use('/api/user', userRoutes);  

const PORT = 3400;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
