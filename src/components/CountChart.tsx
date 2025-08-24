"use client";

import Image from "next/image";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    {
      name: "Total",
      count: boys + girls,
      fill: "white",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#C3EBFA",
    },
  ];
  return (
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
  );
};

export default CountChart;
