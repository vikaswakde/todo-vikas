"use client";
import AddTaskModel from "@/components/AddTaskModel";
import EditTaskModel from "@/components/EditTaskModel";
import { Task, useTaskStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const week = [
  {
    day: "M",
    date: 20,
    currentDay: false,
    pastDay: true,
  },
  {
    day: "T",
    date: 21,
    currentDay: false,
    pastDay: true,
  },
  {
    day: "W",
    date: 22,
    currentDay: false,
    pastDay: true,
  },
  {
    day: "T",
    date: 23,
    currentDay: false,
    pastDay: true,
  },
  {
    day: "F",
    date: 24,
    currentDay: true,
    pastDay: false,
  },
  {
    day: "S",
    date: 25,
    currentDay: false,
    pastDay: false,
  },
  {
    day: "S",
    date: 26,
    currentDay: false,
    pastDay: false,
  },
];

export default function Home() {
  // Local States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Global State
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.removeTask);

  const handleTaskStatusChange = (task: Task) => {
    const newStatus = task.status === "DONE" ? "TODO" : "DONE";
    updateTask(task.id, newStatus);
  };

  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  return (
    <main className="min-h-full min-w-full">
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-[3.2rem] w-[25rem] h-[45rem]  border-[0.4rem] border-[#E4E8E9] bg-white">
        <div className="flex flex-col h-full w-full py-3 items-start justify-between  bg-[#e4e8e9] bg-opacity-30">
          {/* day selection section */}
          <header className=" absolute  top-0 left-0  space-y-8 w-full pt-8 pb-6 px-4 rounded-t-[3rem] rounded-b-3xl shadow-xl bg-white">
            <h1 className="font-bold text-2xl">onday</h1>
            <nav className=" flex items-center justify-between">
              {week.map(({ date, day, currentDay, pastDay }) => (
                <button
                  key={date}
                  className={cn(
                    "px-3 py-[5px] flex flex-col items-center rounded-md hover:bg-black hover:text-white text-gray-400 group transition duration-200 hover:cursor-pointer",
                    currentDay && "bg-black text-white",
                    pastDay && "text-black hover:bg-gray-400"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm group-hover:text-white hover:text-md ",
                      pastDay && "text-gray-400"
                    )}
                  >
                    {day}
                  </span>
                  <span className="font-semibold">{date}</span>
                </button>
              ))}
            </nav>
          </header>
          {/* todo list section */}
          <section className="mt-[8.8rem] pt-[2.5rem] w-full px-2  min-h-[69%] overflow-scroll scrollbar-hide max-w-[24rem] ">
            <h2 className="font-bold px-2 ">Today</h2>
            <ul className="p-1 pt-2 flex flex-col  w-full">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex py-2 rounded-2xl px-2 items-start space-x-3 border-white/2 bg-white shadow-sm group cursor-pointer my-1 "
                >
                  <div className="flex pt-2 px-1">
                    <input
                      type="checkbox"
                      checked={task.status === "DONE"}
                      onChange={() => handleTaskStatusChange(task)}
                      className="form-checkbox border-black focus:ring-0  rounded-full h-6 w-6 cursor-pointer text-black  transition duration-200"
                      aria-label={`Mark ${task.title} as complete`}
                    />
                  </div>
                  <div className="flex flex-col flex-grow  overflow-clip">
                    <h3
                      className={cn(
                        "font-serif font-extrabold text-lg",
                        task.status === "DONE" &&
                          "line-through transition duration-200 text-gray-400"
                      )}
                    >
                      {task.title.slice(0, 37) +
                        (task.title.length > 37 ? "..." : "")}
                    </h3>
                    {task.description && (
                      <p
                        className={cn(
                          "text-sm text-gray-800 font-serif",
                          task.status === "DONE" && "line-through text-gray-400"
                        )}
                      >
                        {task.description?.slice(0, 90) +
                          (task.description.length > 90 ? "..." : "")}
                      </p>
                    )}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex flex-col space-y-1">
                    <button
                      onClick={() => setEditingTask(task)}
                      className={cn(
                        "transition-opacity duration-200 p-2 hover:bg-gray-100 rounded-xl",
                        task.status === "DONE" && "hidden"
                      )}
                      aria-label="Edit Task"
                    >
                      <PencilIcon className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className={
                        "transition-opacity duration-200 p-2 hover:bg-red-100 hover:rounded-xl"
                      }
                      aria-label="Delete Task"
                    >
                      {" "}
                      <Trash2Icon
                        className={cn(
                          "w-3 h-3",
                          task.status === "DONE" && "w-5 h-5"
                        )}
                      />
                    </button>
                  </div>
                </li>
              ))}
              {editingTask && (
                <EditTaskModel
                  task={editingTask}
                  isOpen={!!editingTask}
                  onClose={() => setEditingTask(null)}
                />
              )}
            </ul>
          </section>
          {/* add todo button */}
          <footer className="flex w-full items-center justify-center h-full mb-2 mt-5">
            <button
              className="rounded-full h-10 w-10 bg-white shadow-2xl relative border p-6 cursor-pointer"
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
            />
          </footer>
        </div>
      </section>
    </main>
  );
}
