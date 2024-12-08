import { cn } from "@/lib/utils";
import { PencilIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import TaskProgress from "./TaskProgress";
import EditTaskModel from "./EditTaskModel";
import { Task, useTaskStore } from "@/lib/store";

const TaskListSection = ({ selectedDate }: { selectedDate: Date }) => {
  // Local States
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Global State
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);

  const deleteTask = useTaskStore((state) => state.removeTask);
  const handleTaskStatusChange = (task: Task) => {
    const newStatus = task.status === "DONE" ? "TODO" : "DONE";
    updateTask(task.id, newStatus);
  };

  const getTasksForSelectedDate = () => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === selectedDate.toDateString();
    });
  };
  // stats function
  const getTaskStats = () => {
    const tasksForDay = getTasksForSelectedDate();
    const totalTasks = tasksForDay.length;
    const completedTasks = tasksForDay.filter(
      (task) => task.status === "DONE"
    ).length;

    return { totalTasks, completedTasks };
  };

  const { totalTasks, completedTasks } = getTaskStats();
  const filteredTasks = getTasksForSelectedDate();

  return (
    <section className="mt-[8.8rem] pt-[2.5rem] w-full px-2  min-h-[69%] overflow-scroll scrollbar-hide max-w-[24rem] ">
      <div className="flex items-start justify-between">
        <h2 className="font-semibold px-2 flex items-center gap-2">
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
        <div>
          <TaskProgress
            totalTasks={totalTasks}
            completedTasks={completedTasks}
          />
        </div>
      </div>
      <ul className="p-1 pt-2 flex flex-col  w-full">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex py-2 rounded-2xl px-2 items-start space-x-3 border-white/2 bg-white shadow-sm group  my-1 "
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
                  className={cn("w-3 h-3", task.status === "DONE" && "w-5 h-5")}
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
  );
};

export default TaskListSection;
