import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalenderContainer from "@/components/EventCalenderContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className=" p-4 flex flex-col md:flex-row gap-4">
      {/* left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8 ">
        {/* user cards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="parent" />
          <UserCard type="teacher" />
        </div>
        {/* middle charts */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* radial chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          {/* bar chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        {/* bootom chart */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        {/* calender and events */}
        <EventCalenderContainer searchParams={searchParams} />
        {/* announcements */}
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
