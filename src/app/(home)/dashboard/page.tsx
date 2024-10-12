"use client";

import { useGetUser } from "@/components/actions";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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
    return <span>Get out!!!!</span>
  }

  return (
    <div>
        <div>
            
        </div>
    </div>
  );
};

export default Dashboard;
