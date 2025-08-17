import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  return (
    <nav className="flex p-4 items-center md:justify-between justify-end">
      {/* search bar */}

      <div className="hidden md:flex items-center gap-2 rounded-full text-xs ring-[1.5px] ring-gray-300  px-2">
        <Image src={"/search.png"} alt="search icon" height={14} width={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* <TableSearch /> */}
      {/* icons and user */}
      <div className="flex items-center  gap-6">
        <div className="bg-white rounded-full  w-7 h-7 flex justify-center items-center cursor-pointer">
          <Image
            src={"/message.png"}
            alt="message icon"
            height={20}
            width={20}
          />
        </div>
        <div className="bg-white rounded-full relative  w-7 h-7 flex justify-center items-center cursor-pointer">
          <Image
            src={"/announcement.png"}
            alt="announcement icon"
            height={20}
            width={20}
          />
          <span className="absolute text-xs -top-3 -right-3 flex items-center justify-center h-5 w-5 rounded-full bg-purple-500 text-white">
            1
          </span>
        </div>
        <div className="flex flex-col">
          <span className="leading-3 font-medium text-xs">Furqan Mirza</span>
          <span className="text-[10px] text-gray-500 text-right">{role}</span>
        </div>
        {/* <Image
          src={"/avatar.png"}
          alt="user"
          width={36}
          height={36}
          className="rounded-full"
        /> */}
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
