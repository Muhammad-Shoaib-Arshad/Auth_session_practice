// test-hash.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config(); // Load your MongoDB URI from .env

const testDatabase = async () => {
  try {
    // 1. Connect to MongoDB Atlas (Replace with your actual URI string if not using .env)
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:24017/auth-practice');
    console.log('🔌 Connected to MongoDB successfully.');

    // Clear existing test users so we don't hit the unique email error
    await User.deleteMany({ email: 'intern@test.com' });

    // 2. Create a new user instance
    const newUser = new User({
      name: 'Test Intern',
      email: 'intern@test.com',
      password: 'SuperSecretPassword123' // Plain text going in
    });

    // 3. Save the user (This triggers the pre-save hook!)
    const savedUser = await newUser.save();
    console.log('✅ User saved successfully in MongoDB!');
    console.log('Mongoose Object Document Response:', savedUser);

    // 4. Verification Check
    // We use .select('+password') because 'select: false' hides it by default
    const verifiedUser = await User.findOne({ email: 'intern@test.com' }).select('+password');
    console.log('\n--- VERIFICATION RESULT ---');
    console.log('Plain text password sent was: SuperSecretPassword123');
    console.log('Stored Password in Database: ', verifiedUser.password);
    
    // Check if it starts with the bcrypt identifier ($2a$ or $2b$)
    if (verifiedUser.password.startsWith('$2')) {
      console.log('🚀 SUCCESS: The password is safely encrypted!');
    } else {
      console.log('❌ FAILURE: The password is still plain text!');
    }

    // Close connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error during execution:', error);
    process.exit(1);
  }
};

testDatabase();