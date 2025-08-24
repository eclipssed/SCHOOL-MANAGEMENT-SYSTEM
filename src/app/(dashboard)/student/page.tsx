import Announcements from "@/components/Announcements";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import EventCalender from "@/components/EventCalender";
import prisma from "@/lib/prisma";
import { getRole } from "@/lib/role";

const StudentPage = async () => {
  const { currentUserId } = await getRole();
  const classItem = await prisma.class.findMany({
    where: {
      students: {
        some: {
          id: currentUserId!,
        },
      },
    },
  });
  return (
    <div className=" p-4 flex flex-col md:flex-row gap-4">
      {/* left */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalenderContainer type="classId" id={classItem[0].id} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        {/* calender and events */}
        <EventCalender />
        {/* announcements */}
        <Announcements />
      </div>{" "}
    </div>
  );
};

export default StudentPage;
