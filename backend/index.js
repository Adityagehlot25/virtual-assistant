import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express(); // ✅ define app first

// middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());    // parse JSON
app.use(cookieParser());    // parse cookies

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userRouter);

// start server
const port = process.env.PORT || 8000; // ✅ fallback to 8000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`MongoDB URL: ${process.env.MONGODB_URL}`);
});
