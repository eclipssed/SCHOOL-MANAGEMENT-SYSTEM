import Image from "next/image";

const Announcements = () => {
  return (
    <div className=" bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl  font-semibold">Announcements</h1>
        <span className="text-gray-400 text-xs cursor-pointer">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {/* announcement 1 */}
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-mdedium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
            cumque.
          </p>
        </div>
        {/* announcement 2 */}
        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-mdedium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
            cumque.
          </p>
        </div>
        {/* announcement 3 */}
        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-mdedium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
            cumque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
