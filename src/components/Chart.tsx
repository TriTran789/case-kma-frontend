"use client";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetDashboard } from "./actions";

const ApexChart = (props: any) => {
  const { getDashboard } = useGetDashboard();
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [series, setSeries] = useState<any>([]);
  const [options, setOptions] = useState<any>({});

  const fetchDashboard = async () => {
    const res = await getDashboard({ year, month });
  };

  useEffect(() => {
    fetchDashboard();
  }, [year, month]);

  useEffect(() => {
    setSeries([
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ]);

    setOptions({
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: "Stock Price Movement",
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val: any) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: "Price",
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val: any) {
            return (val / 1000000).toFixed(0);
          },
        },
      },
    });
  }, []);

  return (
    <div className="flex sm:flex-row flex-col w-full bg-blue-600 gap-8">
      <div className="bg-red-600 sm:w-[60%] w-full">
        <div id="chart">
          {typeof window !== "undefined" && (
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={350}
            />
          )}
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
