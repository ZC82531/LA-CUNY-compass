const mongoose = require('mongoose'); // Import Mongoose for database modeling

// Define the resource schema
const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the resource
  content: { type: String, required: true }, // Content of the resource
});

// Create a text index on the content field for full-text search
resourceSchema.index({ content: 'text' });

 // Export the Resource model based on the schema
module.exports = mongoose.model('Resource', resourceSchema);
