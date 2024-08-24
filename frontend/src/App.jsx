import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import MapPage from "./pages/MapPage";
import About from "./pages/About";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
