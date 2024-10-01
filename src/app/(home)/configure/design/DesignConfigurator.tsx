"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { Color, Finish, Material, Model, useGetConfiguration } from "./actions";
import { Rnd } from "react-rnd";
import { RadioGroup } from "@headlessui/react";
import HandleComponent from "@/components/HandleComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DesignConfigurator = () => {
  const router = useRouter();
  const { configurationData, isLoadingConfig } = useGetConfiguration();

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [renderedDimension, setRenderedDimension] = useState({
    height: typeof window !== 'undefined' ? Number(localStorage.getItem("height")) / 4 : 1,
    width: typeof window !== 'undefined' ? Number(localStorage.getItem("width")) / 4 : 1,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });

  const [options, setOptions] = useState<{
    color: Color;
    model: Model;
    material: Material;
    finish: Finish;
  }>({
    color: configurationData?.colors[0] as Color,
    model: configurationData?.models[0] as Model,
    material: configurationData?.materials[0] as Material,
    finish: configurationData?.finishes[0] as Finish,
  });

  const setDefaultConfig = () => {
    setOptions({
      color: configurationData?.colors[0] as Color,
      model: configurationData?.models[0] as Model,
      material: configurationData?.materials[0] as Material,
      finish: configurationData?.finishes[0] as Finish,
    });
  };

  useEffect(() => {
    setDefaultConfig();
  }, [configurationData]);

  if (isLoadingConfig) {
    return <span>Loading...</span>;
  }

  async function saveConfiguration(configuration: any) {
    setIsLoading(true);
    const {
      left: caseLeft,
      top: caseTop,
      width,
      height,
    } = phoneCaseRef.current!.getBoundingClientRect();

    const { left: containerLeft, top: containerTop } =
      containerRef.current!.getBoundingClientRect();

    const leftOffset = caseLeft - containerLeft;
    const topOffset = caseTop - containerTop;

    const actualX = renderedPosition.x - leftOffset;
    const actualY = renderedPosition.y - topOffset;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const userImage = new Image();
    userImage.crossOrigin = "anonymous";
    userImage.src = typeof window !== 'undefined' ? (localStorage.getItem("image") as string) : "";
    await new Promise((resolve) => (userImage.onload = resolve));

    ctx?.drawImage(
      userImage,
      actualX,
      actualY,
      renderedDimension.width,
      renderedDimension.height
    );

    const base64 = canvas.toDataURL();

    typeof window !== 'undefined' && localStorage.setItem("croppedImage", base64);
    typeof window !== 'undefined' && localStorage.setItem("configuration", configuration.toString());

    router.push(`/configure/preview`);
  }

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              fill
              alt="phone image"
              src="/phone-template.png"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]"
              // `bg-${options.color.tw}`
              // "bg-[#ccc]"
            )}
            style={{ backgroundColor: options?.color?.hex_code }}
          />
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            height: typeof window !== 'undefined' ? Number(localStorage.getItem("height")) / 4 : 1,
            width: typeof window !== 'undefined' ? Number(localStorage.getItem("width")) / 4 : 1,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimension({
              height: Number(ref.style.height.slice(0, -2)),
              width: Number(ref.style.width.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage
              src={typeof window !== 'undefined' ? localStorage.getItem("image") as string : ""}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />

          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your case
            </h2>

            <div className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options?.color}
                  onChange={(val) => {
                    setOptions((prev: any) => ({
                      ...prev,
                      color: val,
                    }));
                  }}
                >
                  <Label>Color: {options?.color?.name}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {configurationData?.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                            {
                              [`border-[#ccc]`]: active || checked,
                            }
                          )
                        }
                      >
                        <span
                          className={`h-8 w-8 rounded-full border border-black border-opacity-10`}
                          style={{ backgroundColor: color.hex_code }}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options?.model?.name}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {configurationData?.models.map((model) => (
                        <DropdownMenuItem
                          key={model.name}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                model.name === options?.model?.name,
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              model.name === options?.model?.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {model.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[
                  configurationData?.materials,
                  configurationData?.finishes,
                ].map((value, index) => (
                  <RadioGroup
                    key={index}
                    value={value}
                    onChange={(val) => {
                      setOptions((prev) => ({
                        ...prev,
                        [index === 0 ? "material" : "finish"]: val,
                      }));
                    }}
                  >
                    <Label className="capitalize">
                      {index === 0 ? "material" : "finish"}
                    </Label>
                    <div className="mt-3 space-y-4">
                      {value?.map((option) => (
                        <RadioGroup.Option
                          key={option.slug}
                          value={option}
                          className={({ active, checked }) =>
                            cn(
                              "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                              {
                                // "border-primary": active || checked,
                                "border-primary":
                                  option.slug === options?.material?.slug ||
                                  option.slug === options?.finish?.slug,
                              }
                            )
                          }
                        >
                          <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                              <RadioGroup.Label
                                className="font-medium text-gray-900"
                                as="span"
                              >
                                {option.name}
                              </RadioGroup.Label>

                              {option.description ? (
                                <RadioGroup.Description
                                  as="span"
                                  className="text-gray-500"
                                >
                                  <span className="block sm:inline">
                                    {option.description}
                                  </span>
                                </RadioGroup.Description>
                              ) : null}
                            </span>
                          </span>

                          <RadioGroup.Description
                            as="span"
                            className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                          >
                            <span className="font-medium text-gray-900">
                              {formatPrice(option.price)}
                            </span>
                          </RadioGroup.Description>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center justify-between">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  Number(configurationData?.base) +
                    options?.finish?.price +
                    options?.material?.price
                )}
              </p>
              <Button
                onClick={() => {
                  saveConfiguration(options);
                }}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
