"use client";
import { Button } from "@headlessui/react";
import { useAdminGetUsers } from "./actions";

const Users = () => {
  const { isLoading, adminGetUsers } = useAdminGetUsers();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-4 w-full sm:w-[80%] sm:mx-auto flex flex-col gap-4">
        {adminGetUsers.data.map((item: any, index: number) => (
          <div
            key={index}
            className="flex sm:flex-row flex-col gap-4 sm:justify-between sm:border-b sm:items-center"
          >
            <div className="flex sm:flex-row flex-col gap-4">
              <p className={`w-56 ${item?.is_lock && "line-through"}`}>
                {item.name}
              </p>
              <p className={` ${item.is_lock && "line-through"}`}>
                {item.email}
              </p>
            </div>
            <Button
              className={`${
                item.is_lock
                  ? "bg-blue-600 hover:bg-blue-400"
                  : "bg-red-600 hover:bg-red-400"
              } rounded-lg font-semibold text-white px-4 py-2 max-sm:w-full`}
            >
              {item?.is_lock ? "Allow" : "Ban"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
