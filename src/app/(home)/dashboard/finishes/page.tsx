"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeDefaultValue, useGetDefaultValue } from "./actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const Finishes = () => {
  const { isLoading: loadingValue, defaultValue } = useGetDefaultValue();
  const { isLoading: loadingChange, changeDefaultValue } =
    useChangeDefaultValue();

  const [data, setData] = useState();

  const handleChange = async () => {
    await changeDefaultValue(data);
  };

  if (loadingValue) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-4 w-full sm:w-[80%] sm:mx-auto flex flex-col gap-4">
        <Label className="font-bold text-xl">Default Value</Label>
        <Label>Base fee</Label>
        <Input
          type="text"
          onChange={(e: any) =>
            setData((pre: any) => ({ ...pre, base_fee: e.target.value }))
          }
          defaultValue={defaultValue.base_fee}
        />
        <Label>Finish fee</Label>
        <Input
          type="text"
          onChange={(e: any) =>
            setData((pre: any) => ({ ...pre, finish_fee: e.target.value }))
          }
          defaultValue={defaultValue.finish_fee}
        />
        <Label>Material fee</Label>
        <Input
          type="text"
          onChange={(e: any) =>
            setData((pre: any) => ({ ...pre, material_fee: e.target.value }))
          }
          defaultValue={defaultValue.material_fee}
        />
        <div className="w-full flex justify-end">
          <Button onClick={handleChange}>
            {loadingChange ? <Loader2 className="animate-spin" /> : <>Save</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Finishes;
