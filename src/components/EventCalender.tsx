"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";

// temporary
const events = [
  {
    id: 1,
    title: "The quick brown fox ",
    time: "12:00 PM - 2:00 AM",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis, perspiciatis?",
  },
  {
    id: 2,
    title: "The quick brown fox ",
    time: "12:00 PM - 2:00 AM",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis, perspiciatis?",
  },
  {
    id: 3,
    title: "The quick brown fox ",
    time: "12:00 PM - 2:00 AM",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis, perspiciatis?",
  },
  {
    id: 4,
    title: "The quick brown fox ",
    time: "12:00 PM - 2:00 AM",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis, perspiciatis?",
  },
];

const EventCalender = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className=" bg-white p-4 rounded-md">
      {/* calender */}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md w-full  "
        captionLayout="dropdown"
      />
      {/* events */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl my-4 font-semibold">Events</h1>
        <Image src={"/moreDark.png"} alt="more icon" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-5 rounded-md border-2 border-gray-100  border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalender;
