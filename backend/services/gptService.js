const { Configuration, OpenAIApi } = require("openai"); // Import OpenAI client library
const dotenv = require('dotenv'); // Import dotenv for environment variable management

dotenv.config(); // Load environment variables from .env file

// Configure OpenAI API with the provided API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration); // Create an instance of OpenAIApi

// Initial prompt for the GPT model
const INIT_PROMPT = "You are a helpful and knowledgeable assistant specializing in providing information about CUNY resources. When a student asks you about any resource, such as academic support, tutoring services, financial aid, internships, career services, campus facilities, or student organizations, respond with accurate and detailed information. Make sure to guide them on how to access these resources, including any necessary links, contact details, or steps they should follow. Don't give me markdown response.";

// Function to get a response from GPT based on conversation history
async function getGPTResponse(history) {
  try {
    // Call OpenAI's createChatCompletion method
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini", // Specify the model to use
      messages: history, // Pass the conversation history
    });
    
    return response.data.choices[0].message.content; // Return the response content
  } catch (error) {
    console.error("Error fetching response:", error); // Log any errors
    throw new Error("Failed to fetch response from GPT."); // Throw an error for further handling
  }
}

// Export the getGPTResponse function and the initial prompt
module.exports = { getGPTResponse, INIT_PROMPT };
