import { getCookie } from "cookies-next";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useAdminGetColors = () => {
  const adminGetColorsRequest = async () => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/config/color`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users admin");
    }

    return response.json();
  };

  const {
    isLoading,
    error,
    data: adminGetColors,
    refetch: refetchColors,
  } = useQuery("admingetColors", adminGetColorsRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, adminGetColors, refetchColors };
};

export const useAddColor = () => {
  const addColorRequest = async (data: any) => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/config/color`,
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
      throw new Error("Failed to add color");
    }

    return response.json();
  };

  const {
    isLoading,
    error,
    mutateAsync: addColor,
  } = useMutation(addColorRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, addColor };
};

export const useRemoveColor = () => {
  const removeColorRequest = async (slug: string) => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/config/color/${slug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove color");
    }

    return response.json();
  };

  const {
    isLoading,
    error,
    mutateAsync: removeColor,
  } = useMutation(removeColorRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, removeColor };
};
