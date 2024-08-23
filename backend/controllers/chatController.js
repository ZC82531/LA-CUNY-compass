const Message = require('../models/Message'); // Import the Message model
const { getGPTResponse, INIT_PROMPT } = require('../services/gptService'); // Import GPT service functions

// Initialize messages array with a system prompt
const messages = [{ role: "system", content: INIT_PROMPT }];

// Chat handler
exports.chat = async (req, res) => {
  // Validate request body
  if (!req.body.message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const messageContent = req.body.message; // Extract user message
  messages.push({ role: "user", content: messageContent }); // Add user message to messages array

  try {
    const gptResponse = await getGPTResponse(messages); // Get response from GPT
    messages.push({ role: "system", content: gptResponse }); // Add GPT response to messages array

    const timestamp = new Date().toISOString(); // Generate timestamp
    res.json({
      message: { text: gptResponse, timestamp, type: "system" }, // Send response
      timestamp,
      type: "system"
    });
  } catch (error) {
    // Error handling
    console.error("Error in chat controller:", error);
    res.status(500).json({ error: error.message });
  }
};

// Questionnaire handler
exports.questionare = async (req, res) => {
  const data = req.body.questionData; // Extract question data from request body

  // Validate request body
  if (!data) {
    return res.status(400).json({ error: "Question data is required" });
  }

  // Construct prompt based on question data
  const prompt = `I am a student attending ${data.question1} college. I started college ${data.question2}. I am ${data.question3} about CUNY resources. I have used or plan to use ${data.question4} from CUNY resources. Essential needs are most important during my time at CUNY ${data.question5}. I anticipate facing ${data.question6} during my time at CUNY. Provide me personal resources that I can utilize at my college. Don't give me markdown response.`;

  messages.push({ role: "user", content: prompt }); // Add user prompt to messages array

  try {
    const gptResponse = await getGPTResponse(messages); // Get response from GPT
    messages.push({ role: "system", content: gptResponse }); // Add GPT response to messages array

    const timestamp = new Date().toISOString(); // Generate timestamp
    res.json({
      message: { text: gptResponse, timestamp, type: "system" }, // Send response
      timestamp,
      type: "system"
    });
  } catch (error) {
    // Error handling
    console.error("Error in questionare controller:", error);
    res.status(500).json({ error: error.message });
  }
};
