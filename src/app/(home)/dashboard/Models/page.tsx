"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useAddModel, useAdminGetModels, useRemoveModel } from "./actions";
import { useState } from "react";
import { convertBase64 } from "@/lib/convertBase64";

const Models = () => {
  const [data, setData] = useState<any>();
  const { adminGetModels, refetchModels, isLoading } = useAdminGetModels();
  const { addModel } = useAddModel();
  const { removeModel } = useRemoveModel();

  const handleChangeImage = async (file: File) => {
    const base64 = await convertBase64(file);
    setData((pre: any) => ({ ...pre, image: base64 }));
  };

  const handleAddModel = async () => {
    await addModel(data);
    await refetchModels();
    const inputs = document.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => (input.value = ""));
  };

  const handleRemoveModel = async (slug: string) => {
    await removeModel(slug);
    await refetchModels();
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-4 w-full sm:w-[80%] sm:mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Label className="text-lg font-semibold">New Model</Label>
          <div className="flex sm:flex-row flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <Label className="text-nowrap max-sm:w-32">Name</Label>
              <Input
                placeholder="Iphone 16"
                type="text"
                onChange={(e: any) =>
                  setData((pre: any) => ({ ...pre, name: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Label className="text-nowrap max-sm:w-32">Image</Label>
              <Input
                type="file"
                onChange={(e: any) => handleChangeImage(e.target.files[0])}
              />
            </div>
            <Button onClick={handleAddModel}>Add</Button>
          </div>
        </div>
        <div
          id="colorList"
          className="flex flex-row gap-8 flex-wrap border-t mt-4 pt-4"
        >
          {adminGetModels?.map((item: any, index: number) => (
            <div
              key={index}
              className="border rounded-full flex flex-row gap-2 shadow p-1 pl-3 items-center"
            >
              <p>{item.name}</p>
              <div
                onClick={() => handleRemoveModel(item.slug)}
                className="rounded-full group hover:bg-red-600 size-8 flex items-center justify-center cursor-pointer"
              >
                <X className="group-hover:text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Models;
