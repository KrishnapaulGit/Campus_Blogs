import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

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
app.use(express.json());
const port =3000; 


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
.on('error', (err) => {
  console.error('Error starting server:', err);
});


// Api
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);


// middleware for error handling

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;

  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })

});
