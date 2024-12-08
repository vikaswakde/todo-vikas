import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

export type Status = "DONE" | "TODO";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  date: string;
};

export type State = {
  tasks: Task[];
};

export type Actions = {
  // they just produce side effects
  addTask: (title: string, description?: string, date?: Date) => void;
  removeTask: (id: string) => void;
  updateTask: (title: string, status: Status) => void;
  updateTaskContent: (
    id: string,
    updates: { title?: string; description?: string }
  ) => void;
};

// Add initial demo data
const getDemoTasks = (): Task[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return [
    {
      id: uuid(),
      title: "👋 Welcome to Onday!",
      description:
        "This is a demo task. You can edit or delete it by hovering over the task.",
      status: "TODO" as Status,
      date: today.toISOString(),
    },
    {
      id: uuid(),
      title: "✨ Create your first task",
      description: "Click the + button at the bottom to add a new task.",
      status: "TODO" as Status,
      date: today.toISOString(),
    },
    {
      id: uuid(),
      title: "📅 Navigate through weeks",
      description:
        "Use the arrows beside the calendar to view different weeks.",
      status: "DONE" as Status,
      date: today.toISOString(),
    },
    {
      id: uuid(),
      title: "🎯 Tomorrow's planning",
      description:
        "Click on any date in the calendar to add tasks for different days.",
      status: "TODO" as Status,
      date: tomorrow.toISOString(),
    },
    {
      id: uuid(),
      title: "⚡️ Quick access to today",
      description:
        "Click the 'Today' button in the top right corner to instantly jump back to today's tasks.",
      status: "TODO" as Status,
      date: tomorrow.toISOString(),
    },
  ];
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: getDemoTasks(), // Initialize with demo tasks
      addTask: (title: string, description?: string, date?: Date) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: uuid(),
              title,
              description,
              status: "TODO",
              date: date ? date.toISOString() : new Date().toISOString(),
            },
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
      updateTaskContent: (
        id: string,
        updates: { title?: string; description?: string }
      ) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),
    }),
    {
      name: "todo-store-vikas",
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (
          typeof window !== "undefined" &&
          !localStorage.getItem("todo-store-vikas")
        ) {
          if (state && !state.tasks?.length) {
            state.tasks = getDemoTasks();
          }
        }
      },
    }
  )
);
