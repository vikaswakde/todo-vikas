import { formatDate, getWeekDates } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

interface HeaderProps {
  selectedDate: Date;
  week: ReturnType<typeof getWeekDates>;
  //   only updates states without returing values
  setSelectedDate: (date: Date) => void;
}

const Header = ({ selectedDate, setSelectedDate, week }: HeaderProps) => {
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

  return (
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
                // pastDay && "text-black hover:bg-gray-400",
                currentDay &&
                  "border border-cyan-400 bg-cyan-100 text-cyan-800",
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
  );
};

export default Header;
