import { getCookie } from "cookies-next";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useGetDefaultValue = () => {
  const getDefaultValueRequest = async () => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/config`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get default values");
    }

    return response.json();
  };

  const {
    isLoading,
    data: defaultValue,
    error,
  } = useQuery("fetchDefaultValue", getDefaultValueRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, defaultValue };
};

export const useChangeDefaultValue = () => {
  const changeDefaultValueRequest = async (data: any) => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/config`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to change default values");
    }

    return response.json();
  };

  const {
    isLoading,
    mutateAsync: changeDefaultValue,
    error,
  } = useMutation(changeDefaultValueRequest)

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, changeDefaultValue };
};
