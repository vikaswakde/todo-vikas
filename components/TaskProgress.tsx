import React from "react";

interface TaskProgressProps {
  totalTasks: number;
  completedTasks: number;
}

const TaskProgress = ({ completedTasks, totalTasks }: TaskProgressProps) => {
  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  return (
    <div className="w-full px-4 py-3 bg-white rounded-xl shadow-sm mr-[13rem]">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-black transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-bold ">{percentage}%</span>
      {percentage === 100 && totalTasks > 0 && (
        <span className="text-black font-medium pl-3">🎉 All Done</span>
      )}
    </div>
  );
};

export default TaskProgress;
