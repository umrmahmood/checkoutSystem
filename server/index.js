import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import transactionRoutes from './transactions.js';
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(transactionRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
