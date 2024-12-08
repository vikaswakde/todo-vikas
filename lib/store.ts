import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

export type Status = "DONE" | "TODO";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
};

export type State = {
  tasks: Task[];
};

export type Actions = {
  // they just produce side effects
  addTask: (title: string, description?: string) => void;
  removeTask: (id: string) => void;
  updateTask: (title: string, status: Status) => void;
  updateTaskContent: (id:string, updates: {title?:string; description?:string}) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title: string, description?: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: uuid(), title, description, status: "TODO" },
          ],
        })),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id != id),
        })),
      updateTask: (id: string, status: Status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })),
        updateTaskContent: (id: string, updates: {title?:string; description?:string}) =>
           set((state) => ({
            tasks: state.tasks.map((task) => task.id === id ? {...task, ...updates} : task)
        })),
    }),
    { name: "todo-store", skipHydration: true }
  )
);
