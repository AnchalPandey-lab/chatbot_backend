import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/users.js';
import questionRoutes from './routes/questions.js';
import uploadRoutes from './routes/upload.js';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'
import auth from './middleware/auth.js';
import cookieParser from 'cookie-parser';


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser()); // Add cookie-parser middleware for authentication
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,  
  }));

// Connect to MongoDB with Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Connect to MongoDB with MongoClient
const client = new MongoClient(process.env.MONGO_URI);
let db;
client.connect()
    .then(() => {
        db = client.db('sample_mflix');
        console.log('MongoClient connected');
    })
    .catch(err => console.log(err));

// Middleware to attach the database to the request object
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/questions',auth, questionRoutes);
app.use('/api',auth, uploadRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));