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

app.get("/", (req, res)=>{
  res.send("Welcome to the Beneficiary Management System");
})
const PORT = 2000;

export default async (req, res) => {
  try {
    await connectDB();
    app(req, res);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

