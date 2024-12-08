"use client";
import { useTaskStore } from "@/lib/store";
import React, { useState } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModel = ({ isOpen, onClose }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = useTaskStore((state) => state.addTask);
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask(title, description);
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task Title"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModel;
