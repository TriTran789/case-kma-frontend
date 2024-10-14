"use client";
import { useEffect, useState } from "react";
import { useGetDashboard } from "./actions";

import { Check, ChevronsUpDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { cn, formatPrice } from "@/lib/utils";

const DashboardData = (props: any) => {
  const currentDate = new Date();
  const { getDashboard } = useGetDashboard();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [data, setData] = useState<any>();

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const years = [
    currentDate.getFullYear(),
    currentDate.getFullYear() - 1,
    currentDate.getFullYear() - 2,
    currentDate.getFullYear() - 3,
    currentDate.getFullYear() - 4,
  ];

  const chartConfig = {
    desktop: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const fetchDashboard = async () => {
    const res = await getDashboard({ year, month });
    // setOrderData(res?.orders?.chart?.count);
    // setAmountData(res?.orders?.chart?.amount);
    setData(res);
    console.log(res);
  };

  useEffect(() => {
    fetchDashboard();
  }, [year, month]);

  return (
    <div className="flex flex-col gap-4">
      {/* dropdown */}
      <div className="flex flex-row justify-end gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Label>Month:</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                <p>{month}</p>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow">
              <div className="max-h-40 overflow-y-auto">
                {months.map((item, index) => (
                  <DropdownMenuItem
                    onClick={() => setMonth(item)}
                    key={index}
                    className={cn(
                      "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                      {
                        "bg-zinc-100": item === month,
                      }
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        item === month ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label>Year:</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                <p>{year}</p>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow">
              <div className="max-h-40 overflow-y-auto">
                {years.map((item, index) => (
                  <DropdownMenuItem
                    onClick={() => setYear(item)}
                    key={index}
                    className={cn(
                      "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                      {
                        "bg-zinc-100": item === year,
                      }
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        item === year ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* chart */}
      <div className="flex sm:flex-row flex-col sm:justify-between gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Orders Chart</CardTitle>
            <CardDescription>
              Showing total orders for the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={data?.orders?.chart?.count}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="value"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Amount Chart</CardTitle>
            <CardDescription>
              Showing total amount for the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={data?.orders?.chart?.amount}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="value"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent> 
        </Card>
      </div>
      {/* infor */}
      <div className="flex sm:flex-row flex-col gap-4">
        <div className="flex-1 border rounded-lg px-14 py-2">
          <p className="font-bold">Total:</p>
          <p className="">{formatPrice(data?.orders?.amount?.month?.total)}</p>
        </div>
        <div className="flex-1 border rounded-lg px-14 py-2">
          <p className="font-bold">Paid:</p>
          <p className="">{formatPrice(data?.orders?.amount?.month?.paid)}</p>
        </div>
        <div className="flex-1 border rounded-lg px-14 py-2">
          <p className="font-bold">Pending:</p>
          <p className="">{formatPrice(data?.orders?.amount?.month?.pending)}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;
