"use client";

import Image from "next/image";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#c3ebfa" },
  { name: "Group B", value: 8, fill: "#fae27c" },
];

const PerformanceChart = () => {
  return (
    <div className="bg-white rounded-md p-4 h-80 relative">
      <div className=" flex items-center justify-between ">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Image src="/moreDark.png" alt="more icon" height={16} width={16} />
      </div>{" "}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            // outerRadius={80}
            innerRadius={70}
            fill="#8884d8"
            // label
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 transform text-center">
        <h1 className="text-3xl font-bold">9.4</h1>
        <p className="text-xs text-gray-300">out of 10 FTS</p>
      </div>
      <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">1st semester - 2nd semester</h2>
    </div>
  );
};

export default PerformanceChart;
