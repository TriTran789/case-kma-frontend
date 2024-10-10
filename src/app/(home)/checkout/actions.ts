import { getCookie } from "cookies-next";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export type Data = {
  country: Country;
  province: Province | string;
  district: District | string;
  address: string;
  quantity: number;
  postalCode?: string;
};

export type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
};

export const useGetCountry = () => {
  const getCountryRequest = async (): Promise<Country[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shipping/country`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch country");
    }

    return response.json();
  };

  const {
    data: countries,
    isLoading: isLoadingCountry,
    error,
  } = useQuery("fetchCountry", getCountryRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { countries, isLoadingCountry };
};

export type Province = {
  code: string;
  name: string;
};

export const useGetProvince = () => {
  const getProvinceRequest = async (): Promise<Province[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shipping/province`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch province");
    }

    return response.json();
  };

  const {
    data: provinces,
    isLoading: isLoadingProvince,
    error,
  } = useQuery("fetchProvince", getProvinceRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { provinces, isLoadingProvince };
};

export type District = {
  code: string;
  name: string;
};

export const useGetDisTrict = () => {
  const getDistrictRequest = async (id: string): Promise<District[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shipping/district/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch distric");
    }

    return response.json();
  };

  const {
    mutateAsync: getDistrict,
    isLoading: isLoadingDistrict,
    error,
  } = useMutation(getDistrictRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoadingDistrict, getDistrict };
};

export const useGetMyConfig = () => {
  const getMyConfigRequest = async (id: string): Promise<any> => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/configuration/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get my config");
    }

    return response.json();
  };

  const {
    mutateAsync: getMyConfig,
    isLoading,
    error,
  } = useMutation(getMyConfigRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { getMyConfig, isLoading };
};

export const useGetShip = () => {
  const getShipRequest = async ({
    CountryCode,
    ToProvince,
    ToDistrict,
  }: {
    CountryCode: string;
    ToProvince?: number;
    ToDistrict?: number;
  }) => {
    let url;
    if (CountryCode === "VN") {
      url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shipping/cost?CountryCode=VN&ToProvince=${ToProvince}&ToDistrict=${ToDistrict}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shipping/cost?CountryCode=${CountryCode}`;
    }
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get ship");
    }

    return response.json();
  };

  const {
    mutateAsync: getShip,
    isLoading,
    error,
  } = useMutation(getShipRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { getShip, isLoading };
};

export const useCreateShippingAddress = () => {
  const createShippingAddressRequest = async (data: any) => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment`,
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
      throw new Error("Failed to checkout");
    }

    return response.json();
  };

  const {
    isLoading,
    error,
    isSuccess,
    mutateAsync: createShippingAddress,
  } = useMutation(createShippingAddressRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("Checkout Successfully");
  }

  return { isLoading, createShippingAddress };
};

export const useGetOldAddress = () => {
  const getOldAddressRequest = async () => {
    const accessToken = getCookie("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/address`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get old address");
    }

    return response.json();
  };

  const {
    data: oldAddress,
    isLoading,
    error,
  } = useQuery("getOldAddress", getOldAddressRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { isLoading, oldAddress };
};
