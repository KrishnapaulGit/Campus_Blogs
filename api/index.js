import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO;
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

connectDB();

const app = express();
const port =3000; 


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
.on('error', (err) => {
  console.error('Error starting server:', err);
});