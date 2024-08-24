import React from "react";
import Navbar from "../components/NavBar";
import Background from "../components/Background";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Background>
      <Navbar />
      <main className="mt-[-100px] flex flex-grow items-center justify-center text-center">
        <div>
          <h1 className="mb-8 animate-fade-in-down text-4xl font-bold text-white">
            Discover the Resources You Need to Succeed at CUNY.
          </h1>
          <div className="transform animate-fade-in-delay space-x-4 opacity-0">
            <Link
              to="/questionnaire"
              className="rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-blue-600"
            >
              Answer Questionnaire
            </Link>
            <Link
              to="/chat"
              className="rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-blue-600"
            >
              Chat with AI
            </Link>
          </div>
        </div>
      </main>
    </Background>
  );
};

export default Home;
