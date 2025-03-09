import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartWidget = ({ options, series }) => (
  <Chart options={options} series={series} type="bar" height={350} />
);

export default ChartWidget;
