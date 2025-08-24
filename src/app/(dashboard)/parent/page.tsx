import Announcements from "@/components/Announcements";
import BigCalender from "@/components/BigCalender";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import prisma from "@/lib/prisma";
import { getRole } from "@/lib/role";

const ParentPage = async () => {
  const { currentUserId } = await getRole();
  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });
  return (
    <div className=" p-4 flex-1 flex flex-col md:flex-row gap-4">
      {/* left */}
      <div className="w-full xl:w-2/3">
        {students.map((student) => (
          <div  key={student.id}>
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">
                Schedule ({student.name + " " + student.surname})
              </h1>
              <BigCalenderContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        {/* announcements */}
        <Announcements />
      </div>{" "}
    </div>
  );
};

export default ParentPage;
