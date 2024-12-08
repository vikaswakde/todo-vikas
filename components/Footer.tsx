import React, { useState } from "react";
import AddTaskModel from "./AddTaskModel";

const Footer = ({ selectedDate }: { selectedDate: Date }) => {
  // Local States
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <footer className="flex w-full items-center justify-center h-full mb-2 mt-5">
      <button
        className="rounded-full h-10 w-10 bg-white shadow-2xl relative border p-6 cursor-pointer transition-opacity duration-300"
        aria-label="Add new todo"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl shadow-2xl">
          +
        </span>
      </button>
      <AddTaskModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
      />
    </footer>
  );
};

export default Footer;
