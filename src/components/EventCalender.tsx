"use client";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EventCalender = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const router = useRouter();

  useEffect(() => {
    if (date instanceof Date) {
      router.push(`?date=${date}`);
    }
  }, [date, router]);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md w-full "
      captionLayout="dropdown"
    />
  );
};

export default EventCalender;
