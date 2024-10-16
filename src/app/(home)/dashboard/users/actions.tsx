import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import { toast } from "sonner";

export const useAdminGetUsers = () => {
  const adminGetUsersRequest = async () => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user`,
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
    data: adminGetUsers,
  } = useQuery("admingetUsers", adminGetUsersRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, adminGetUsers };
};
