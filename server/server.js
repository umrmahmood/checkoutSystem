const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
const transactionRoutes = require('./transactions');

const app = express();
const PORT = 3002;
const MONGO_URI = 'mongodb+srv://umermahmood:Y50SdyREdPed7Luz@shopcounter.cqyfapj.mongodb.net/?retryWrites=true&w=majority&appName=shopCounter'

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
