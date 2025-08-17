"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = (formData.get("search") as string) || "";
    // const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex md:flex items-center gap-2 rounded-full text-xs ring-[1.5px] ring-gray-300  px-2"
    >
      <Image src={"/search.png"} alt="search icon" height={14} width={14} />
      <input
        name="search"
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
      <button type="submit" className="">
        <span className="px-2 py-1 rounded-full cursor-pointer bg-lamaPurple text-white">
          search
        </span>
      </button>
    </form>
  );
};

export default TableSearch;
