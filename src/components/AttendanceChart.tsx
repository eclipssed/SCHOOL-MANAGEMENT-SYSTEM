"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AttendanceChart = ({
  data,
}: {
  data: {
    name: string;
    present: number;
    absent: number;
  }[];
}) => {
  return (
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
  );
};

export default AttendanceChart;
