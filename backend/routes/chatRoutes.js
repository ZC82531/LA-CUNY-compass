const express = require('express'); // Import Express framework
const { chat, questionare } = require('../controllers/chatController'); // Import chat controller functions

const router = express.Router();

// Chat endpoint
router.post('/chat', chat); 

// Questionnaire endpoint
router.post('/questionare', questionare); 

// Export the router
module.exports = router;
