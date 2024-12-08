"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TaskListSection from "@/components/TaskListSection";

import { getWeekDates } from "@/lib/dateUtils";
import { useTaskStore } from "@/lib/store";

import { useEffect, useState } from "react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [week, setWeek] = useState(getWeekDates(selectedDate));

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
        <div className="flex flex-col h-full w-full py-3 items-start justify-between  bg-[#e4e8e9] bg-opacity-30 rounded-[3.2rem]">
          {/* day selection section */}
          <Header
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            week={week}
          />

          {/* todo list section */}
          <TaskListSection selectedDate={selectedDate} />

          {/* add todo button */}
          <Footer selectedDate={selectedDate} />
        </div>
      </section>
    </main>
  );
}
