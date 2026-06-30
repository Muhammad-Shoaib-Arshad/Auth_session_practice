require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');


mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/auth-practice')
  .then(() => console.log('🔌 Connected to MongoDB successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const app = express();

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ 
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/auth-practice' 
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    httpOnly: true, 
    secure: false // keep false for localhost testing
  },
}));

app.use('/api/vi/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Add this right above app.listen(...)
app.get('/', (req, res) => {
  res.send('<h1>🚀 Auth API Server is running smoothly!</h1>');
});