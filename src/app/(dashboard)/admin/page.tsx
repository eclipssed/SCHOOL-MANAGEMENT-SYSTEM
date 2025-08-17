import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalender from "@/components/EventCalender";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className=" p-4 flex flex-col md:flex-row gap-4">
      {/* left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8 ">
        {/* user cards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="students" />
          <UserCard type="parents" />
          <UserCard type="teachers" />
          <UserCard type="staffs" />
        </div>
        {/* middle charts */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* radial chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* bar chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
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
        <EventCalender />
        {/* announcements */}
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
