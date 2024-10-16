import { getCookie } from "cookies-next";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useAdminGetModels = () => {
  const adminGetModelsRequest = async () => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/config/model`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get models");
    }

    return response.json();
  };

  const {
    isLoading,
    error,
    data: adminGetModels,
    refetch: refetchModels,
  } = useQuery("adminGetModels", adminGetModelsRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, adminGetModels, refetchModels };
};

export const useAddModel = () => {
  const addModelRequest = async (data: any) => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/config/model`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add model");
    }

    return response.json();
  };

  const {
    isLoading,
    error,
    mutateAsync: addModel,
  } = useMutation(addModelRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, addModel };
};