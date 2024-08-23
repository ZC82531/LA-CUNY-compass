const mongoose = require('mongoose'); 
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Database connection function
const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected'); // Success message
  } catch (error) {
    // Error handling
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit on failure
  }
};

// Export the connection function
module.exports = connectDB;
