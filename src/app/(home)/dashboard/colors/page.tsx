"use client";
import { Label } from "@/components/ui/label";
import { useAddColor, useAdminGetColors, useRemoveColor } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

const Colors = () => {
  const [data, setData] = useState<any>();
  const { isLoading, adminGetColors, refetchColors } = useAdminGetColors();
  const { addColor } = useAddColor();
  const { removeColor } = useRemoveColor();

  const handleAddColor = async () => {
    await addColor(data);
    await refetchColors();
    const inputs = document.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => (input.value = ""));
  };

  const handleRemoveColor = async (slug: string) => {
    await removeColor(slug);
    await refetchColors();
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-4 w-full sm:w-[80%] sm:mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Label className="text-lg font-semibold">New color</Label>
          <div className="flex sm:flex-row flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <Label className="text-nowrap max-sm:w-32">Name</Label>
              <Input
                placeholder="Black"
                type="text"
                onChange={(e: any) =>
                  setData((pre: any) => ({ ...pre, name: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Label className="text-nowrap max-sm:w-32">Hex Code</Label>
              <Input
                type="text"
                placeholder="#000000"
                onChange={(e: any) =>
                  setData((pre: any) => ({ ...pre, hex_code: e.target.value }))
                }
              />
            </div>
            <Button onClick={handleAddColor}>Add</Button>
          </div>
        </div>
        <div
          id="colorList"
          className="flex flex-row gap-8 flex-wrap border-t mt-4 pt-4"
        >
          {adminGetColors?.map((item: any, index: number) => (
            <div key={index} className="border rounded-full flex flex-row gap-2 shadow p-1 items-center">
              <div
                className="w-8 h-8 rounded-full border shadow"
                style={{ backgroundColor: item.hex_code }}
              />
              <p>{item.name}</p>
              <div
                onClick={() => handleRemoveColor(item.slug)}
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

export default Colors;
