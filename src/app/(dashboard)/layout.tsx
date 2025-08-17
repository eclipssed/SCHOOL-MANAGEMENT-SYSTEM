import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] overflow-scroll p-4 overflow-x-hidden">
        <Link
          href={"/"}
          className="flex justify-center lg:justify-start  items-center gap-2"
        >
          <Image src={"/logo.png"} alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">FurqanSchool</span>
        </Link>
        <Menu />
      </div>
      {/* right */}
      <div className=" w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-childrenBg overflow-scroll overflow-x-hidden flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
