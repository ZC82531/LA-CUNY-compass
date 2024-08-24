import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

#set API keys and other variables
MODEL = "gpt-4o-mini"
client = OpenAI(api_key = os.environ.get("OPENAI_API_KEY"))
INIT_PROMPT = " You are a helpful and knowledgeable assistant specializing in providing information about CUNY resources. When a student asks you about any resource, such as academic support, tutoring services, financial aid, internships, career services, campus facilities, or student organizations, respond with accurate and detailed information. Make sure to guide them on how to access these resources, including any necessary links, contact details, or steps they should follow. Don't give me markdown response"

# Initialize the conversation history with the initial prompt to give model better context with follow up questions
# TODO optimize this to delete older messages after a certain point to reduce TOKEN usage

# conversation_history = [
#     {"role": "system", "content": INIT_PROMPT}
# ]

def get_gpt4_response(history : list):
    
    print("History:", history)
    try:

        

        # Make a request to the GPT-4 modell
        response = client.chat.completions.create(
            model = MODEL,
            messages = history,

        )

        models_response = response.choices[0].message.content

        history.append({"role": "system", "content": models_response})
        print(history)


        return models_response
    
        # Convert the response to a dictionary
        # response_dict = response.model_dump()
        
        # # Stringify the JSON for easy viewing
        # json_str = json.dumps(response_dict, indent=2)
        # print("Full Response Structure:")
        # print(json_str)    

        # Extract and return the model's response

    except Exception as e:
        return f"An error occurred: {str(e)}"

print(get_gpt4_response("can you tell me 2 resources for tutoring services in CCNY?"))
print(get_gpt4_response("what about financial aid options?"))

