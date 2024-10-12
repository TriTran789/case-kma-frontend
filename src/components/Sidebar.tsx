"use client";

import { useGetUser } from "@/components/actions";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SquareMenu } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Dashboard", link: "/dashboard" },
  { label: "Orders", link: "/dashboard/orders" },
  { label: "Users", link: "/dashboard/users" },
];

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-blue-600 p-1 flex justify-center items-center rounded-r-lg fixed top-24">
          <SquareMenu className="size-8 text-white" />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="bg-white z-[101] px-0">
        <SheetHeader>
          <SheetDescription>
            <div className="flex flex-col py-12">
              {links.map(
                (item: { label: string; link: string }, index: number) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="w-full h-12 text-black font-base hover:bg-slate-100 flex items-center pl-12"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
