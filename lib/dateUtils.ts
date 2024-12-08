export function getWeekDates(date: Date = new Date()) {
  const currentDate = new Date(date);
  const currentDay = currentDate.getDay();

  const sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() - currentDay);

  const week = [];
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(sunday);
    dayDate.setDate(sunday.getDate() + i);

    const today = new Date();
    const isToday = dayDate.toDateString() === today.toDateString();
    const isPast = dayDate < new Date(new Date().setHours(0, 0, 0, 0));

    week.push({
      day: days[i],
      date: dayDate.getDate(),
      fullDate: dayDate,
      currentDay: isToday,
      pastDay: isPast,
    });
  }

  return week;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
