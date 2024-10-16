"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const subLinks = [
  { label: "Models", link: "/dashboard/models" },
  { label: "Colors", link: "/dashboard/colors" },
  { label: "Default", link: "/dashboard/finishes" },
];

const Sidebar = () => {
  const handleClick = () => {
    const button = document.querySelector("button.absolute.right-4.top-4");
    button instanceof HTMLButtonElement && button.click();
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-blue-600 p-1 flex justify-center items-center rounded-r-lg fixed top-24 hover:shadow">
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
                    onClick={handleClick}
                    key={index}
                    href={item.link}
                    className="w-full h-12 text-black font-base hover:bg-slate-100 flex items-center pl-12"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-none h-12">
                  <AccordionTrigger className="hover:bg-slate-100 hover:no-underline">
                    <div className="w-full text-black font-base flex items-center pl-12">
                      Config
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {subLinks.map(
                      (
                        item: { label: string; link: string },
                        index: number
                      ) => (
                        <Link
                          onClick={handleClick}
                          key={index}
                          href={item.link}
                          className="w-full h-12 text-black font-base hover:bg-slate-100 flex items-center pl-20"
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
