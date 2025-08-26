import Announcements from "@/components/Announcements";
import BigCalender from "@/components/BigCalender";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import FormContainer from "@/components/FormContainer";
import PerformanceChart from "@/components/PerformanceChart";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import prisma from "@/lib/prisma";
import { getRole } from "@/lib/role";
import { Class, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SingleStudentPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { role } = await getRole();

  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: {
      id: id,
    },
    include: {
      class: {
        include: {
          _count: {
            select: {
              lessons: true,
            },
          },
        },
      },
    },
  });
  if (!student) {
    return notFound();
  }
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
                src={student.img || "/avatar.png"}
                alt="avatar"
                width={144}
                height={144}
                className="rounded-full  w-36 h-36 object-cover"
              />
            </div>
            <div className="sm:w-2/3 w-1/2 flex flex-col justify-between gap-4">
              <div className="flex gap-2">
                <h1 className="text-xl font-semibold">
                  {student.name + " " + student.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="student" type="update" data={student} />
                )}
              </div>{" "}
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
                  <span>{student.bloodType}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src={"/date.png"}
                    alt="blood icon"
                    width={14}
                    height={14}
                  />{" "}
                  <span>
                    {new Intl.DateTimeFormat("en-us").format(student.birthday)}
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src={"/mail.png"}
                    alt="blood icon"
                    width={14}
                    height={14}
                  />{" "}
                  <span>{student.email || "-"}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image
                    src={"/phone.png"}
                    alt="blood icon"
                    width={14}
                    height={14}
                  />{" "}
                  <span>{student.phone}</span>
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
              <Suspense fallback="loading...">
                <StudentAttendanceCard id={student.id} />
              </Suspense>
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
                <h1 className="text-xl font-semibold">
                  {student.class.name.charAt(0)}
                </h1>
                <span className="text-sm text-gray-400">Grade</span>
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
                <h1 className="text-xl font-semibold">
                  {student.class._count.lessons}
                </h1>
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
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <span className="text-sm text-gray-400">class</span>
              </div>
            </div>
          </div>
        </div>
        {/* botton */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Students's schedule</h1>
          <BigCalenderContainer type="classId" id={student.class.id} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* shortcuts */}
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-4">
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/lessons?classId=${1}`}
            >
              Students's lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/classes?classId=${1}`}
            >
              Students's classes
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaYellowLight"
              href={`/list/teachers?classId=${1}`}
            >
              Students's teachers
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaPurpleLight"
              href={`/list/exams?classId=${1}`}
            >
              Students's exams
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/assignments?classId=${1}`}
            >
              Students's assignments
            </Link>
            <Link
              className="p-3 rounded-md bg-lime-50"
              href={`/list/results?studentId=${"student2"}`}
            >
              Students's results
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

export default SingleStudentPage;
