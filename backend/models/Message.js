const mongoose = require('mongoose'); // Import Mongoose for database modeling

// Define the message schema
const messageSchema = new mongoose.Schema({
  role: { type: String, required: true }, // Role of the message sender (e.g., user, system)
  content: { type: String, required: true }, // Content of the message
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Export the Message model based on the schema
module.exports = mongoose.model('Message', messageSchema);
