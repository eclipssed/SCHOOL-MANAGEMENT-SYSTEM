import Announcements from "@/components/Announcements";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import { getRole } from "@/lib/role";

const TeacherPage = async () => {
  const { currentUserId } = await getRole();
  return (
    <div className=" p-4 flex-1 flex flex-col md:flex-row gap-4">
      {/* left */}
      <div className="w-full xl:w-2/3">
        <div className="h-full  bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalenderContainer type="teacherId" id={currentUserId!} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        {/* announcements */}
        <Announcements />
      </div>{" "}
    </div>
  );
};

export default TeacherPage;
