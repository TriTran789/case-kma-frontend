"use client";
import { Button } from "@/components/ui/button";
import { useGetOrders } from "./actions";
import Phone from "@/components/Phone";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const Orders = () => {
  const { isLoading, orders } = useGetOrders();
  console.log(orders);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex gap-2 items-center justify-center">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Orders
        </h2>
      </div>

      <div className="mt-4 w-full sm:w-[80%] sm:mx-auto flex flex-col gap-4">
        {orders?.map((item: any, index: number) => (
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
                  <span className="font-semibold">Status: </span>
                  {item?.status}
                </p>
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
              {item?.link ? (
                <a href={item?.link}>
                  <Button className="max-sm:w-full">Checkout</Button>
                </a>
              ) : (
                <Link
                  href={`/checkout?configuration_id=${item?.configuration?.configuration_id}`}
                >
                  <Button className="max-sm:w-full">Buy Again</Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
