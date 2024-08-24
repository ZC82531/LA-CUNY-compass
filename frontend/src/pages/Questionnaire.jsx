import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import Navbar from "../components/NavBar";
import MultipleChoice from "../components/MultipleChoice";
import { questions } from "../data/questionnaireQuestions";

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleOptionChange = (selectedOption) => {
    const questionKey = `question${currentQuestion + 1}`;

    setResponses((prevResponses) => {
      const selectedOptions = prevResponses[questionKey] || [];
      if (selectedOptions.includes(selectedOption)) {
        return {
          ...prevResponses,
          [questionKey]: selectedOptions.filter(
            (option) => option !== selectedOption,
          ),
        };
      } else {
        return {
          ...prevResponses,
          [questionKey]: [...selectedOptions, selectedOption],
        };
      }
    });
  };

  const handleSubmit = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitted(true);
      setTimeout(() => {
        console.log(responses);
        navigate("/chat", { state: { responses } });
      }, 250);
    }
  };

  return (
    <Background>
      <Navbar />
      <div className="m-4 flex flex-grow items-center justify-center">
        <div className="mt-[-100px] w-full max-w-4xl rounded-md bg-white p-20">
          <h2 className="mb-12 text-center text-4xl font-bold text-blue-900">
            {submitted ? "Submitted" : "Questionnaire"}
          </h2>
          {!submitted ? (
            <div
              key={currentQuestion}
              className="animate-fade-in-question space-y-8"
            >
              <p className="text-xl font-semibold">
                {currentQuestion + 1}. {questions[currentQuestion].question}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <MultipleChoice
                    key={index}
                    question={`question${currentQuestion + 1}`}
                    option={option}
                    selectedOptions={
                      responses[`question${currentQuestion + 1}`] || []
                    }
                    onChange={handleOptionChange}
                    index={index}
                  />
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-lg font-semibold text-blue-700">
              Your responses have been submitted. The backend will process your
              answers shortly...
            </p>
          )}
        </div>
      </div>
    </Background>
  );
};

export default Questionnaire;
