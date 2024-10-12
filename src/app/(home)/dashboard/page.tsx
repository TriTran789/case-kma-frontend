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
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Dashboard = () => {
  const [user, setUser] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { getUser, isLoading } = useGetUser();

  const fetchUser = async () => {
    if (getCookie("access_token")) {
      const res = await getUser();
      setUser(res);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [cookies]);

  if (user?.role !== "admin") {
    return <span>Get out!!!!</span>;
  }

  return (
    <div>
      dashboard
    </div>
  );
};

export default Dashboard;
