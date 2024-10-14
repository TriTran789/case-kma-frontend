"use client";

import { useGetUser } from "@/components/actions";
import Sidebar from "@/components/Sidebar";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Layout = ({ children }: { children: React.ReactNode }) => {
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

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (user?.role !== "admin") {
    return <span>Get out!!!!</span>;
  }

  return (
    <div>
      <Sidebar />
      <div className="lg:px-32 md:px-6 px-4 sm:py-4">{children}</div>
    </div>
  );
};

export default Layout;
