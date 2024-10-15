import { getCookie } from "cookies-next";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useGetOrdersAdmin = () => {
  const getOrdersAdminRequest = async () => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/order`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch orders admin");
    }

    return response.json();
  };

  const {
    isLoading,
    error,
    data: orders,
  } = useQuery("fetchOrdersAdmin", getOrdersAdminRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, orders };
};

export const useChangeStatus = () => {
  const changeStatusRequest = async ({
    status,
    orderId,
  }: {
    status: string;
    orderId: string;
  }) => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/order/${orderId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "status", status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to change status");
    }

    return response.json();
  };

  const {
    isLoading,
    mutateAsync: changeStatus,
    error,
  } = useMutation(changeStatusRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, changeStatus };
};
