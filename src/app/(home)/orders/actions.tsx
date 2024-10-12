import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import { toast } from "sonner";

export const useGetOrders = () => {
  const getOrdersRequest = async () => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery("getOldAddress", getOrdersRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, orders };
};
