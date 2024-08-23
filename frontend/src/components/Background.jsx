import React from "react";
import background from "../assets/background.avif";

const Background = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex min-h-screen flex-col"
    >
      <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
      <div className="relative flex flex-grow flex-col">{children}</div>
    </div>
  );
};

export default Background;
