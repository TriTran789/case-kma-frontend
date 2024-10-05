"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Country,
  District,
  Province,
  useGetCountry,
  useGetDisTrict,
  useGetMyConfig,
  useGetProvince,
  useGetShip,
} from "./actions";
import { useEffect, useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const payments = ["paypal", "card", "vnpay", "bank"];

const CheckoutForm = ({ configId }: { configId: string }) => {
  const { isLoadingCountry, countries } = useGetCountry();
  const { isLoadingProvince, provinces } = useGetProvince();
  const { getDistrict, isLoadingDistrict } = useGetDisTrict();
  const { getMyConfig, isLoading: isLoadingMyConfig } = useGetMyConfig();
  const { getShip, isLoading: isLoadingShip } = useGetShip();

  const [districts, setDistricts] = useState<District[]>();

  const [dataVn, setDataVn] = useState<any>({});
  const [dataRegion, setDataRegion] = useState<any>({});
  const [currentCountry, setCurrentCountry] = useState<Country>();
  const [myConfig, setMyConfig] = useState<any>();
  const [ship, setShip] = useState<any>();
  const [previousDistrcict, setPreviousDistrcict] = useState<District>();

  const setDefaultDataVn = async () => {
    if (countries && provinces) {
      setDataVn((prev: any) => ({
        ...prev,
        country: countries[0],
        province: provinces[0],
        method: payments[0],
        quantity: 1,
      }));
      const res = await getDistrict((provinces as Province[])[0].code);
      setDistricts(res);
      setDataVn((prev: any) => ({
        ...prev,
        district: res[0],
      }));
      setCurrentCountry(countries[0]);
    }
    setDataRegion({
      method: payments[0],
      quantity: 1,
    });
  };

  useEffect(() => {
    setDefaultDataVn();
  }, [countries, provinces]);

  const fetchNewDistricts = async () => {
    const res = await getDistrict(dataVn?.province?.code);
    setDistricts(res);
    setDataVn((prev: any) => ({
      ...prev,
      district: res[0],
    }));
  };

  useEffect(() => {
    fetchNewDistricts();
  }, [dataVn?.province?.code]);

  const fetchMyConfig = async () => {
    const res = await getMyConfig(configId);
    setMyConfig(res);
  };

  useEffect(() => {
    fetchMyConfig();
  }, []);

  const fetchShip = async () => {
    if (currentCountry?.code === "VN") {
      if (
        dataVn?.country?.code &&
        dataVn?.province?.code &&
        dataVn?.district?.code
      ) {
        if (dataVn?.district?.code !== previousDistrcict?.code) {
          const res = await getShip({
            CountryCode: dataVn?.country?.code,
            ToProvince: dataVn?.province?.code,
            ToDistrict: dataVn?.district?.code,
          });
          setShip(res);
        }
      }
    } else {
      if (dataRegion?.country?.code) {
        const res = await getShip({ CountryCode: dataRegion?.country?.code });
        setShip(res);
      }
    }
  };

  useEffect(() => {
    fetchShip();
  }, [currentCountry?.code, dataVn?.province?.code, dataVn?.district?.code]);

  if (isLoadingCountry || isLoadingProvince) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex justify-center flex-col space-y-4">
      <div className="relative flex flex-col gap-3 w-full">
        <Label>Country</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              <div className="flex gap-2">
                <Image
                  src={currentCountry?.flag as string}
                  width={16}
                  height={16}
                  alt="flag"
                />
                {currentCountry?.name}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="max-h-40 overflow-y-auto">
              {countries?.map((country) => (
                <DropdownMenuItem
                  key={country.code}
                  className={cn(
                    "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                    {
                      "bg-zinc-100": country.name === currentCountry?.name,
                    }
                  )}
                  onClick={() => {
                    setCurrentCountry(country);
                    setDataRegion((prev: any) => {
                      return {
                        ...prev,
                        country,
                      };
                    });
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      country.name === currentCountry?.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {country.name}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {currentCountry?.code === "VN" ? (
        <>
          <div className="relative flex flex-col gap-3 w-full">
            <Label>Province</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {dataVn?.province?.name}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="max-h-40 overflow-y-auto">
                  {provinces?.map((province) => (
                    <DropdownMenuItem
                      key={province.code}
                      className={cn(
                        "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                        {
                          "bg-zinc-100":
                            province.name === dataVn?.province?.name,
                        }
                      )}
                      onClick={() => {
                        setDataVn((prev: any) => {
                          setPreviousDistrcict(prev.district);
                          return {
                            ...prev,
                            province,
                          };
                        });
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          province.name === dataVn?.province?.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {province.name}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative flex flex-col gap-3 w-full">
            <Label>District</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {dataVn?.district?.name}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="max-h-40 overflow-y-auto">
                  {districts?.map((district) => (
                    <DropdownMenuItem
                      key={district.code}
                      className={cn(
                        "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                        {
                          "bg-zinc-100":
                            district.name === dataVn?.district?.name,
                        }
                      )}
                      onClick={() => {
                        setDataVn((prev: any) => {
                          setPreviousDistrcict(prev.district);
                          return {
                            ...prev,
                            district,
                          };
                        });
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          district.name === dataVn?.district?.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {district.name}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <>
          <div className="relative flex flex-col gap-3 w-full">
            <Label>Province</Label>
            <Input
              type="text"
              onChange={(e: any) => {
                setDataRegion((prev: any) => ({
                  ...prev,
                  province: e.target.value,
                }));
              }}
            />
          </div>

          <div className="relative flex flex-col gap-3 w-full">
            <Label>District</Label>
            <Input
              type="text"
              onChange={(e: any) => {
                setDataRegion((prev: any) => ({
                  ...prev,
                  district: e.target.value,
                }));
              }}
            />
          </div>

          <div className="relative flex flex-col gap-3 w-full">
            <Label>Postal code</Label>
            <Input
              type="text"
              onChange={(e: any) => {
                setDataRegion((prev: any) => ({
                  ...prev,
                  postalCode: e.target.value,
                }));
              }}
            />
          </div>
        </>
      )}

      <div className="relative flex flex-col gap-3 w-full">
        <Label>Address</Label>
        <Input
          type="text"
          onChange={(e: any) => {
            setDataVn((prev: any) => ({
              ...prev,
              address: e.target.value,
            }));
            setDataRegion((prev: any) => ({
              ...prev,
              address: e.target.value,
            }));
          }}
        />
      </div>

      <div className="relative flex flex-col gap-3 w-full">
        <Label>Quantity</Label>
        <Input
          type="number"
          onChange={(e: any) => {
            setDataVn((prev: any) => ({
              ...prev,
              quantity: e.target.value,
            }));
            setDataRegion((prev: any) => ({
              ...prev,
              quantity: e.target.value,
            }));
          }}
          defaultValue={dataRegion.quantity}
        />
        {Number(dataVn?.quantity) < 1 && (
          <p className="text-red-600 text-sm">Quantity must at least 1</p>
        )}
      </div>

      <div className="relative flex flex-col gap-3 w-full">
        <Label>Payments</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between capitalize"
            >
              {dataVn?.method}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="max-h-40 overflow-y-auto">
              {payments?.map((method) => (
                <DropdownMenuItem
                  key={method}
                  className={cn(
                    "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 capitalize",
                    {
                      "bg-zinc-100": method === dataVn?.method,
                    }
                  )}
                  onClick={() => {
                    setDataVn((prev: any) => {
                      return {
                        ...prev,
                        method,
                      };
                    });
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      method === dataVn?.method ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {method}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex justify-between text-sm">
        <p className="font-bold">Price:</p>
        <p>
          {isLoadingMyConfig
            ? formatPrice(0)
            : formatPrice(
                Number(
                  myConfig?.amount +
                    myConfig?.amount_material +
                    myConfig?.amount_finish
                ) * Number(dataVn?.quantity ?? 1)
              )}
        </p>
      </div>

      <div className="flex justify-between text-sm">
        <p className="font-bold">Ship:</p>
        <p>{isLoadingShip ? formatPrice(0) : formatPrice(ship?.amount)}</p>
      </div>

      <div className="flex justify-between text-sm">
        <p className="font-bold">Total:</p>
        <p>
          {isLoadingShip
            ? formatPrice(0)
            : formatPrice(
                ship?.amount +
                  (myConfig?.amount +
                    myConfig?.amount_material +
                    myConfig?.amount_finish) *
                    Number(dataVn?.quantity ?? 1)
              )}
        </p>
      </div>

      <div className="flex justify-between text-sm">
        <p className="font-bold">Time estimated:</p>
        <p>
          {isLoadingShip ? 0 : ship?.j} {ship?.j === "1" ? "day" : "days"}
        </p>
      </div>
      <Button
        onClick={() =>
          currentCountry?.code === "VN"
            ? console.log(dataVn)
            : console.log(dataRegion)
        }
        disabled={
          isLoadingDistrict ||
          isLoadingShip ||
          Number(dataVn?.quantity) < 1 ||
          currentCountry?.code !== "VN"
            ? !dataRegion?.province ||
              !dataRegion?.district ||
              !dataRegion?.address ||
              !dataRegion?.postalCode
            : !dataVn?.address
        }
      >
        Checkout
      </Button>
    </div>
  );
};

export default CheckoutForm;
