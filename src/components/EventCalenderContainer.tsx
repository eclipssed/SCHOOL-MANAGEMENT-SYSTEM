import Image from "next/image";
import EventCalender from "./EventCalender";
import EventList from "./EventList";

const EventCalenderContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { date } = await searchParams;
  return (
    <div className=" bg-white p-4 rounded-md">
      {/* calender */}
      <EventCalender />
      {/* events */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl my-4 font-semibold">Events</h1>
        <Image src={"/moreDark.png"} alt="more icon" width={20} height={20} />
      </div>
      <EventList dateParam={date} />
    </div>
  );
};

export default EventCalenderContainer;
