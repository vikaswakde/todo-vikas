"use client";
import AddTaskModel from "@/components/AddTaskModel";
import EditTaskModel from "@/components/EditTaskModel";
import { formatDate, getWeekDates } from "@/lib/dateUtils";
import { Task, useTaskStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  // Local States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [week, setWeek] = useState(getWeekDates(selectedDate));

  // Global State
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.removeTask);

  const handleTaskStatusChange = (task: Task) => {
    const newStatus = task.status === "DONE" ? "TODO" : "DONE";
    updateTask(task.id, newStatus);
  };

  // const goToToday = () => {
  //   setSelectedDate(new Date());
  // };

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  // handle date selection for week
  const handleDateSelect = (date: Date) => {
    const newDate = new Date(date);
    setSelectedDate(newDate);
  };

  const getTasksForSelectedDate = () => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === selectedDate.toDateString();
    });
  };

  const filteredTasks = getTasksForSelectedDate();

  // update week when selected date changes
  useEffect(() => {
    setWeek(getWeekDates(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  return (
    <main className="min-h-full min-w-full select-none">
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-[3.2rem] w-[25rem] h-[45rem]  border-[0.4rem] border-[#E4E8E9] bg-white">
        <div className="flex flex-col h-full w-full py-3 items-start justify-between  bg-[#e4e8e9] bg-opacity-30">
          {/* day selection section */}
          <header className=" absolute  top-0 left-0  space-y-8 w-full pt-8 pb-6 px-3 rounded-t-[3rem] rounded-b-3xl shadow-xl bg-white">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-2xl">onday</h1>
              <h1 className="font-bold text-xs">{formatDate(selectedDate)}</h1>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-3 py-1 text-sm bg-black text-white rounded-full hover:bg-gray-800"
              >
                Today
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={goToPreviousWeek}
                className="p-1 hover:bg-gray-100 rounded-full"
                aria-label="Previous Week"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <nav className="flex items-center justify-between flex-1 ">
                {week.map(({ date, day, currentDay, pastDay, fullDate }) => (
                  <button
                    key={fullDate.toISOString()}
                    onClick={() => handleDateSelect(new Date(fullDate))}
                    className={cn(
                      "px-3 py-[5px] flex flex-col items-center rounded-md hover:bg-black hover:text-white text-gray-400 group transition duration-200",
                      // currentDay && "bg-black text-white",
                      // pastDay && "text-black hover:bg-gray-400",
                      selectedDate.toDateString() === fullDate.toDateString() &&
                        "bg-black text-white transition duration-200"
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm group-hover:text-white",
                        pastDay && "text-gray-400"
                      )}
                    >
                      {day}
                    </span>
                    <span className="font-semibold">{date}</span>
                  </button>
                ))}
              </nav>
              <button
                onClick={goToNextWeek}
                className="p-1 hover:bg-gray-100 rounded-full"
                aria-label="Next Week"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </header>
          {/* todo list section */}
          <section className="mt-[8.8rem] pt-[2.5rem] w-full px-2  min-h-[69%] overflow-scroll scrollbar-hide max-w-[24rem] ">
            <h2 className="font-bold px-2 flex items-center gap-2">
              {filteredTasks.length > 0 ? (
                <>
                  Tasks
                  <span className="bg-black text-white text-xs px-1.5 py-[1px] rounded-xl opacity-65">
                    {filteredTasks.length}
                  </span>
                </>
              ) : (
                "No tasks for this day"
              )}
            </h2>
            <ul className="p-1 pt-2 flex flex-col  w-full">
              {filteredTasks.map((task) => (
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
                          task.status === "DONE" &&
                            "text-gray-400 transition duration-200"
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
              selectedDate={selectedDate}
            />
          </footer>
        </div>
      </section>
    </main>
  );
}
