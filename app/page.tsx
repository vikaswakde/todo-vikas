import AddTaskModel from "@/components/AddTaskModel";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

const todoMap = [
  {
    id: 1,
    status: "DONE",
    title: "Meet Jack Sparrow",
    description: "Free him from the prison",
  },
  {
    id: 2,
    status: "TO_DO",
    title: "Meet Jack Sparrow",
    description: "Free him from the prison",
  },
  {
    id: 3,
    status: "TO_DO",
    title: "Meet Jack Sparrow",
    description: "Free him from the prison",
  },
  {
    id: 4,
    status: "TO_DO",
    title: "Meet Jack Sparrow",
    description: "Free him from the prison",
  },
  {
    id: 5,
    status: "TO_DO",
    title: "Meet Jack Sparrow",
    description: "Free him from the prison",
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <section className="mt-[8.8rem] pt-[2.5rem] w-full px-2">
            <h2 className="font-bold px-2">Today</h2>
            <ul className="p-1 pt-2  w-full space-y-4  to-white'">
              {todoMap.map((item) => (
                <li
                  key={item.id}
                  className="flex py-2 rounded-2xl px-2 items-start space-x-3 border-white/2 bg-white shadow-sm "
                >
                  <div className="flex py-1">
                    <input
                      type="checkbox"
                      className="form-checkbox border-black border-2 rounded-full h-5 w-5 cursor-pointer text-black  text-"
                      aria-label={`Mark ${item.title} as complete`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-serif font-extrabold text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-800 font-serif">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
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
