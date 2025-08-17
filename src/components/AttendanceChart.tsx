"use client";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const data = [
  {
    name: "Mon",
    present: 53,
    absent: 34,
  },
  {
    name: "Tue",
    present: 65,
    absent: 43,
  },
  {
    name: "Wed",
    present: 67,
    absent: 45,
  },
  {
    name: "Thu",
    present: 76,
    absent: 45,
  },
  {
    name: "Fri",
    present: 75,
    absent: 23,
  },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src={"/moreDark.png"} alt="more icon" width={20} height={20} />
      </div>

      {/* chart */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#d1d5db" }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#d1d5db" }} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="absent"
            fill="#FAE27C"
            legendType="circle"
            radius={[10, 10, 0, 0]}
            //   activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            legendType="circle"
            dataKey="present"
            fill="#C3EBFA"
            radius={[10, 10, 0, 0]}

            //   activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
