import Announcements from "@/components/Announcements";
import BigCalender from "@/components/BigCalender";
import PerformanceChart from "@/components/PerformanceChart";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row  gap-4">
      {/* left */}
      <div className="w-full xl:w-2/3">
        {/* top */}
        <div className="flex flex-col lg:flex-row  gap-4">
          {/* user info card */}
          <div className="bg-lamaSky px-4 py-6 rounded-md flex-1 flex gap-4 ">
            <div className="sm:w-1/3 w-1/2 flex justify-center items-center">
              <Image
                src={
                  "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                }
                alt="avatar"
                width={144}
                height={144}
                className="rounded-full  w-36 h-36 object-cover"
              />
            </div>
            <div className="sm:w-2/3 w-1/2 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Furqan Mirza</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div
                // href={"/"}
                className="flex gap-2 items-center justify-between flex-wrap text-xs font-medium"
              >
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src={"/blood.png"}
                    alt="blood icon"
                    width={14}
                    height={14}
                  />{" "}
                  <span>A+</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src={"/date.png"}
                    alt="blood icon"
                    width={14}
                    height={14}
                  />{" "}
                  <span>January 6, 2025</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src={"/mail.png"}
                    alt="blood icon"
                    width={14}
                    height={14}
                  />{" "}
                  <span>user@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src={"/phone.png"}
                    alt="blood icon"
                    width={14}
                    height={14}
                  />{" "}
                  <span>+91 342 9887654</span>
                </div>
              </div>
            </div>
          </div>
          {/* small cards */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md  flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleAttendance.png"}
                alt="attendacne icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md  flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleClass.png"}
                alt="attendacne icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">3</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md  flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleLesson.png"}
                alt="attendacne icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* card */}
            <div className="w-full bg-white p-4 rounded-md  flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleBranch.png"}
                alt="attendacne icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
          </div>
        </div>
        {/* botton */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher's schedule</h1>
          <BigCalender />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* shortcuts */}
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-4">
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/classes?supervisorId=${"teacher2"}`}
            >
              Teacher's classes
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaYellowLight"
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              Teacher's students
            </Link>
            <Link
              className="p-3 rounded-md bg-lime-50"
              href={`/list/lessons?teacherId=${"teacher2"}`}
            >
              Teacher's lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaPurpleLight"
              href={`/list/exams?teacherId=${"teacher2"}`}
            >
              Teacher's exams
            </Link>
            <Link
              className="p-3 rounded-md bg-red-50"
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
              Teacher's assignments
            </Link>
          </div>
        </div>
        {/* performance */}
        <PerformanceChart />
        {/* announcements */}
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
