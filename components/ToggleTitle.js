import React, { useState } from "react";

function ToggleTitle({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="toggle cursor-pointer my-4">
      <h4
        className="flex justify-between text-lg  border-gray-700 mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="">{title}</span>
        <span className="text-2xl">{isOpen ? "-" : "+"}</span>
      </h4>
      {isOpen && children}
    </div>
  );
}

export default ToggleTitle;
