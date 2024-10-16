"use client";
import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { useChangeStatus, useGetOrdersAdmin } from "./actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown } from "lucide-react";

const status = ["pending", "processing", "shipped", "delivered", "cancelled"];

const Orders = () => {
  const { orders, isLoading } = useGetOrdersAdmin();
  const { changeStatus } = useChangeStatus();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const handleChangeStatus = async (subItem: string, orderId: string) => {
    const button = document.getElementById(orderId) as HTMLElement;
    button && (button.innerText = subItem);
    await changeStatus({ status: subItem, orderId });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-4 w-full sm:w-[80%] sm:mx-auto flex flex-col gap-4">
        {orders.data.map((item: any, index: number) => (
          <div
            key={index}
            className="w-full rounded-lg border flex flex-col gap-4 sm:gap-0 sm:flex-row px-8 py-4 justify-between shadow"
          >
            <div className="flex lg:flex-row flex-col lg:gap-16 gap-2">
              <Phone
                style={{
                  backgroundColor: item?.configuration?.color?.hex_code,
                }}
                className={"w-32"}
                imgSrc={item?.configuration?.cropped_image_url}
              />
              <div className="flex flex-col gap-2">
                <h3 className="capitalize font-bold text-lg">
                  {item?.configuration?.model?.name}
                </h3>
                <p className="capitalize">
                  <span className="font-semibold">Material: </span>
                  {item?.configuration?.material}
                </p>
                <div className="flex flex-row">
                  <div className="flex flex-row items-center gap-3 w-32">
                    <span className="font-semibold">Color: </span>
                    <div
                      className="h-6 w-6 rounded-full ring-1 ring-black"
                      style={{
                        backgroundColor: item?.configuration?.color?.hex_code,
                      }}
                    />
                  </div>
                  <p className="capitalize">
                    <span className="font-semibold">Finish: </span>
                    {item?.configuration?.finish}
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="capitalize w-32">
                    <span className="font-semibold">Price: </span>
                    {formatPrice(item?.configuration?.amount)}
                  </p>
                  <p className="capitalize">
                    <span className="font-semibold">Total: </span>
                    {formatPrice(item?.configuration?.total_amount)}
                  </p>
                </div>
                <p className="capitalize">
                  <span className="font-semibold">Name: </span>
                  {item?.shipping_address?.name}
                </p>
                <p className="capitalize line-clamp-1">
                  <span className="font-semibold">Address: </span>
                  {item?.shipping_address?.full_address}
                </p>
              </div>
            </div>
            <div className="flex items-end max-sm:w-full">
              <div className="flex flex-row gap-2 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between capitalize w-32"
                    >
                      <span id={`${item.order_id}`}>{item?.status}</span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-32">
                    <div className="max-h-40 overflow-y-auto">
                      {status?.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 capitalize",
                            {
                              "bg-zinc-100": subItem === item?.status,
                            }
                          )}
                          onClick={() =>
                            handleChangeStatus(subItem, item?.order_id)
                          }
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              subItem === item?.status
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {subItem}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
