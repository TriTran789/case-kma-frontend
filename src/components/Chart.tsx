"use client";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetDashboard } from "./actions";

const ApexChart = (props: any) => {
  const { getDashboard } = useGetDashboard();
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);

  const fetchDashboard = async () => {
    const res = await getDashboard({ year, month });
  };

  return (
    <div className="flex sm:flex-row flex-col w-full bg-blue-600 gap-8">
      <div className="bg-red-600 sm:w-[60%] w-full">
        <div id="chart">
          
        </div>
      </div>
      <div className="bg-green-600 sm:w-[40%] w-full flex sm:flex-col justify-center">
        <div className="border rounded-lg"></div>
      </div>
    </div>
  );

  //   return (
  //     <div className="flex sm:flex-row flex-col">
  //       <div className="sm:w-[50%] lg:w-[60%] w-full">
  //         <div id="chart">
  //           <ReactApexChart
  //             options={options}
  //             series={series}
  //             type="area"
  //             height={350}
  //           />
  //         </div>
  //         <div id="html-dist"></div>
  //       </div>
  //       <div className="bg-red-600 w-full h-full"></div>
  //     </div>
  //   );
};

export default ApexChart;
