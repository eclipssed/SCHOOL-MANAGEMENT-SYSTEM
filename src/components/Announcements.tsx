import prisma from "@/lib/prisma";
import { getRole } from "@/lib/role";

const Announcements = async () => {
  const { role, currentUserId } = await getRole();

  // role conditions
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: {
      date: "desc",
    },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          {
            class: roleConditions[role as keyof typeof roleConditions] || {},
          },
        ],
      }),
    },
  });
  return (
    <div className=" bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl  font-semibold">Announcements</h1>
        <span className="text-gray-400 text-xs cursor-pointer">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data.slice(0, 3).map((item) => (
          <div key={item.id} className="bg-lamaSkyLight rounded-md p-4">
            <div className="flex justify-between items-center">
              <h2 className="font-mdedium">{item.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md p-1">
                {new Intl.DateTimeFormat("en-GB").format(item.date)}{" "}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          </div>
        ))}
        {/* announcement 1 */}
        {/* <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-mdedium">{data[0].title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              {new Intl.DateTimeFormat("en-GB").format(data[0].date)}{" "}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{data[0].description}</p>
        </div> */}
        {/* announcement 2 */}
        {/* <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-mdedium">{data[1].title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              {new Intl.DateTimeFormat("en-GB").format(data[1].date)}{" "}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{data[1].description}</p>
        </div> */}
        {/* announcement 3 */}
        {/* <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-mdedium">{data[2].title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              {new Intl.DateTimeFormat("en-GB").format(data[2].date)}{" "}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{data[2].description}</p>
        </div> */}
      </div>
    </div>
  );
};

export default Announcements;
