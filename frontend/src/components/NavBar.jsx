import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cuny-logo.svg";

const Navbar = () => {
  return (
    <header className="z-10 flex items-center justify-between bg-white p-2 font-semibold">
      <img src={logo} alt="CUNY Logo" className="ml-2 w-12"></img>
      <div className="flex-grow">
        <nav className="flex justify-center text-blue-900">
          <div className="space-x-4 text-sm sm:space-x-6 sm:text-base md:space-x-8 md:text-lg">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/questionnaire">Questionnaire</Link>
            <Link to="/chat">AI Chat</Link>
            <Link to="/map">Map</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
