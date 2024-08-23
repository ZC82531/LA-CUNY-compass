import React from "react";

const MultipleChoice = ({
  question,
  option,
  selectedOptions,
  onChange,
  index,
}) => {
  return (
    <label className="flex cursor-pointer items-center space-x-4">
      <input
        type="checkbox"
        name={question}
        value={option}
        checked={selectedOptions.includes(option)}
        onChange={() => onChange(option)}
        className="hidden"
      />
      <span
        className={`inline-block min-h-10 min-w-10 rounded-full text-center leading-10 ${
          selectedOptions.includes(option)
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-600 hover:bg-blue-200"
        }`}
      >
        {String.fromCharCode(65 + index)}
      </span>
      <span className="text-md">{option}</span>
    </label>
  );
};

export default MultipleChoice;
