import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Background from "../components/Background";
import Navbar from "../components/NavBar";
import chatService from "../service/chatService";

const ChatPage = ({ apiServer }) => {
  const location = useLocation();
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const handleCommonQuestions = (e) => {
    const userMessage = {
      text: e.target.getAttribute("value"),
      timestamp: new Date().toISOString(),
      type: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);

    chatService
      .sendMessage(e.target.getAttribute("value"))
      .then((response) => {
        console.log(response);
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(error.message);
      });

    setNewMessage("");
  };

  const [messages, setMessages] = useState([
    {
      text: (
        <>
          Hello! Please let me know how I can help, some commonly asked
          questions are:
          <br />
        </>
      ),
      timestamp: new Date().toISOString(),
      type: "system",
    },
    {
      text: (
        <>
          <h1
            className="cursor-pointer underline hover:text-blue-900"
            onClick={handleCommonQuestions}
            value="What are some internship opportunities available from CUNY?"
          >
            What are some internship opportunities available from CUNY?
          </h1>
        </>
      ),
      timestamp: new Date().toISOString(),
      type: "system",
    },
    {
      text: (
        <>
          <h1
            className="cursor-pointer underline hover:text-blue-900"
            onClick={handleCommonQuestions}
            value="How can I apply for financial aid?"
          >
            How can I apply for financial aid?
          </h1>
        </>
      ),
      timestamp: new Date().toISOString(),
      type: "system",
    },
    {
      text: (
        <>
          <h1
            className="cursor-pointer underline hover:text-blue-900"
            onClick={handleCommonQuestions}
            value="What are some food resources available for students?"
          >
            What are some food resources available for students?
          </h1>
        </>
      ),
      timestamp: new Date().toISOString(),
      type: "system",
    },
  ]);

  useEffect(() => {
    if (location.state && location.state.responses) {
      const { responses } = location.state;
      setLoading(true);
      chatService.getQuestionare(responses).then((response) => {
        console.log(response);
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
        setLoading(false);
      });
      console.log("Received responses:", responses);
      location.state = null;
    }
  }, [location.state]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage = {
        text: newMessage,
        timestamp: new Date().toISOString(),
        type: "user",
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setLoading(true);

      chatService
        .sendMessage(newMessage)
        .then((response) => {
          console.log(response);
          setMessages((prevMessages) => [
            ...prevMessages,
            response.data.message,
          ]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(error.message);
        });

      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Background>
      <Navbar />
      <div className="relative flex flex-grow items-center justify-center">
        <div className="mx-auto my-5 flex h-[80vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-white p-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`relative max-w-[75%] break-words rounded-2xl p-3 text-base ${
                  msg.type === "user"
                    ? "animate-slideInRight ml-auto self-end bg-green-500 text-white shadow-md"
                    : "animate-slideInLeft mr-auto self-start bg-blue-500 text-white shadow-md"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {loading && (
            <div className="flex items-start justify-center bg-gray-100 p-3">
              <p className="text-base text-gray-500">Loading...</p>
            </div>
          )}
          <div className="flex items-center border-t border-gray-300 bg-gray-100 p-3 shadow-inner">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your response"
              disabled={loading}
              className="mr-3 flex-1 rounded-2xl border border-gray-300 bg-white p-3 text-base transition-colors duration-300 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-2xl bg-blue-500 p-3 px-5 text-base font-medium text-white transition-colors duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default ChatPage;
