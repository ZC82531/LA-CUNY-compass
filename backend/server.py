from flask import Flask, jsonify
from flask_cors import CORS
import requests
from flask import request
import datetime;


app = Flask(__name__)

messages = [{"role" : "system", "content": " You are a helpful and knowledgeable assistant specializing in providing information about CUNY resources. When a student asks you about any resource, such as academic support, tutoring services, financial aid, internships, career services, campus facilities, or student organizations, respond with accurate and detailed information. Make sure to guide them on how to access these resources, including any necessary links, contact details, or steps they should follow"}]



# Allow all methods and origins for the /api/* routes
CORS(app, resources={r"/api/*": {"origins": "*"}},
     methods=["GET", "POST"],
     allow_headers=["Content-Type"])

@app.route("/")
def homepage():
    return "hello world"

@app.route("/api")
def api():
    response = requests.get("https://jsonplaceholder.typicode.com/todos")
    return response.json()

@app.route("/api/chat", methods=["POST"]) 
def chat():
    #get the request body
    data = request.json
    message = data["message"]
    print("Message:", message)

    # conversation_history = [
    # {"role": "system", "content": INIT_PROMPT}
    # ]


    #add the message to the messages list
    messages.append({"role" : "user", "content": message})

    try:
        from chatbot import get_gpt4_response
        response = get_gpt4_response(messages)
        print("Response:", response)
        messages.append({"role": "system", "content": response})
        return jsonify({"message": {"text" : response, "timestamp" :  str(datetime.datetime.now()), "type": "system"}, "timestamp": str(datetime.datetime.now()), "type": "system"})

    except Exception as e:
        return f"An error occurred: {str(e)}"

    # Example response
    return jsonify({"text": "yeah bro", "timestamp": "2021-12-12", "type": "system"})

@app.route("/api/questionare", methods=["POST"])
def questionare():
    data = request.json["questionData"]
    question1 = data["question1"]
    question2 = data["question2"]
    question3 = data["question3"]
    question4 = data["question4"]
    question5 = data["question5"]
    question6 = data["question6"]

    print(question1, question2, question3, question4, question5, question6)

    prompt = f"I am a student attending {question1} college. I started college {question2}. I am {question3} about CUNY resources. I have used or plan to use {question4} from CUNY resources. Essential needs are most important during my time at CUNY {question5}.  I anticpate facing {question6} during my time at CUNY. Provide me personal resources that I can utalize at my college. Don't give me markdown response."


    messages.append({"role" : "user", "content": prompt})
    try:
        from chatbot import get_gpt4_response
        response = get_gpt4_response(messages)
        print("Response:", response)
        messages.append({"role": "system", "content": response})
        return jsonify({"message": {"text" : response, "timestamp" :  str(datetime.datetime.now()), "type": "system"}, "timestamp": str(datetime.datetime.now()), "type": "system"})
    except Exception as e:
        return f"An error occurred: {str(e)}"



    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)