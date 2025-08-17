"use client";

import Image from "next/image";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 120,
    fill: "white",
  },
  {
    name: "Girls",
    count: 50,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 70,
    fill: "#C3EBFA",
  },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src={"/moreDark.png"} alt="more icon" width={20} height={20} />
      </div>
      {/* chart */}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={30}
            data={data}
          >
            <RadialBar
              //   minAngle={15}
              //   label={{ position: "insideStart", fill: "#fff" }}
              background
              //   clockWise
              dataKey="count"
            />
            {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle" /> */}
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src={"/maleFemale.png"}
          alt="male female icon"
          height={50}
          width={50}
          className="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2"
        />
      </div>
      {/* bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="h-5 w-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">1,523</h1>
          <h2 className="text-xs text-gray-300">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-5 w-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">1,223</h1>
          <h2 className="text-xs text-gray-300">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
