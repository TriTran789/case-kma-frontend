import { getCookie } from "cookies-next";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useGetUser = () => {
  // const cookieStore = cookies();
  const getUserRequest = async () => {
    //   const accessToken = cookieStore.get("access_token");
    const accessToken = getCookie("access_token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    mutateAsync: getUser,
    isLoading,
    error,
  } = useMutation(getUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { getUser, isLoading };
};

export const useGetDashboard = () => {
  const getDashboardRequest = async ({
    year,
    month,
  }: {
    year: number | null;
    month: number | null;
  }): Promise<any> => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/dashboard?year=${year}&month=${month}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard");
    }

    return response.json();
  };

  const {
    isLoading,
    mutateAsync: getDashboard,
    error,
  } = useMutation(getDashboardRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, getDashboard };
};
