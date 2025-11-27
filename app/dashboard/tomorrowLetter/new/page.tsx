"use client";

import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { letterSchema, LetterSchema } from "@/schemas/LetterSchema";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ZodError } from "zod";
import { addDays, format } from "date-fns";
import Image from "next/image";
import uploadImageToServer from "@/scripts/uploadImageToServer";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session, status } = useSession();

  const TotalSteps = 4;

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const [step, setStep] = useState(1);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [letterData, setLetterData] = useState<LetterSchema>({
    title: "",
    content: "",
    receiveDate: "2025-12-25",
    receiveTime: "12:00",
    cover: undefined,
  });

  const [coverPreviewURL, setCoverPreviewURL] = useState<string | null>(null);

  const [error, setError] = useState<string | null>();
  const [canProceed, setCanProceed] = useState(false);

  const tomorrow = addDays(new Date(), 1);
  const today = new Date();
  const now = format(today, "hh:mm:ss aa");

  const [imageFile, setImageFile] = useState<File>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === TotalSteps) {
      try {
        const isLetterDataValid = letterSchema.parse(letterData);

        const imageData = await uploadImageToServer(imageFile);

        console.log(imageData);

        //send the post request to the router
      } catch (err) {
        console.log(err);
        setError("error");
      }
    } else {
      next();
    }
  };

  const validateCurrentData = async () => {
    switch (step) {
      case 1:
        try {
          letterSchema.partial().parse({ title: letterData.title });
          setError(null);
          setCanProceed(true);
        } catch (err) {
          handleErros(err);
        }
        break;
      case 2:
        try {
          letterSchema.partial().parse({
            receiveDate: letterData.receiveDate,
            receiveTime: letterData.receiveTime,
          });
          setError(null);
          setCanProceed(true);
        } catch (err) {
          handleErros(err);
        }
        break;
      case 3:
        try {
          letterSchema.partial().parse({ content: letterData.content });
          setError(null);
          setCanProceed(true);
        } catch (err) {
          handleErros(err);
        }
        break;
      default:
        console.log("ERROR");
    }
  };

  const handleErros = (err: unknown) => {
    setCanProceed(false);
    if (err instanceof ZodError) {
      setError(err.issues[0].message);
    } else {
      setError("unknown error");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;

    const file = e.target.files[0];

    setCoverPreviewURL(URL.createObjectURL(file));
    setCanProceed(true);

    setImageFile(file);
  };

  if (status === "unauthenticated") redirect("/dashboard");

  return (
    <section className="relative w-full flex-col min-h-screen p-6 flex items-center justify-center">
      {status === "authenticated" && (
        <form
          className="border-4 border-black w-full rounded-2xl p-4 flex flex-col items-start justify-center bg-white text-black gap-5 lg:w-1/3"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl self-center font-black ">
            Tomorrow&apos;s Letter
          </h1>
          <div className="w-full flex items-center justify-center gap-4 ">
            <div className="bg-black text-white ring-2 ring-[#33333] p-2 rounded-full w-9 h-9 flex items-center justify-center text-xl">
              {step}
            </div>
            <p>
              Step {step} of {TotalSteps}
            </p>
            <div className="bg-black text-white ring-2 ring-[#33333] p-2 rounded-full w-9 h-9 flex items-center justify-center text-xl">
              {TotalSteps}
            </div>
          </div>
          {step === 1 && (
            <>
              <p className="text-center w-full">
                Write a title for your letter
              </p>
              <Label>Letter title:</Label>
              <Input
                placeholder={`e.g: "To my dear person" `}
                onChange={(e) => {
                  setLetterData((prev) => ({ ...prev, title: e.target.value }));
                  validateCurrentData();
                }}
                name="title"
                id="title"
                value={letterData.title}
              />
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-center w-full">
                Select a receive date and time for your letter
              </p>
              <div className="flex gap-4 flex-col w-full">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date-picker" className="px-1">
                    Letter receive date:
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="justify-between font-normal"
                      >
                        {date ? format(date, "yyyy-MM-dd") : "Select Date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        disabled={{ before: tomorrow }}
                        onSelect={(date) => {
                          validateCurrentData();
                          setDate(date);
                          setLetterData((prev) => ({
                            ...prev,
                            receiveDate: date ? format(date, "yyyy-MM-dd") : "",
                          }));
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="time-picker" className="px-1">
                    Letter receive time:
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    placeholder={now}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    value={letterData.receiveTime}
                    onChange={(e) => {
                      validateCurrentData();
                      setLetterData((prev) => ({
                        ...prev,
                        receiveTime: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <p className="text-center w-full">
                Write your letter content here
              </p>
              <Label htmlFor="content">Letter content:</Label>
              <Input
                placeholder={`e.g: "Dear Lover..."`}
                id="content"
                value={letterData.content}
                onChange={(e) => {
                  validateCurrentData();
                  setLetterData((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }));
                }}
              />
            </>
          )}

          {step === 4 && (
            <>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {coverPreviewURL && (
                <div className="relative w-48 h-48 rounded-full overflow-hidden self-center">
                  <Image
                    src={coverPreviewURL}
                    alt="image chosen"
                    fill
                    className="object-cover self-center"
                  />
                </div>
              )}
            </>
          )}

          <p className="text-red-500">{error}</p>

          <div className="w-full flex items-center justify-between px-2 gap-5">
            <Link href="/dashboard" className="w-full">
              Quit
            </Link>

            {step > 1 && (
              <Button
                className="ring-4 ring-green-500 bg-white hover:ring-green-600 hover:bg-white text-black font-bold hover:cursor-pointer w-20"
                type="button"
                onClick={() => {
                  back();
                }}
              >
                back
              </Button>
            )}

            {step < 4 && (
              <Button
                className="bg-green-500 hover:bg-green-600 hover:cursor-pointer w-20 ring-green-500 ring-4 hover:ring-green-600"
                type="button"
                onClick={() => {
                  validateCurrentData();
                  next();
                }}
                disabled={!canProceed}
              >
                Next
              </Button>
            )}

            {step === 4 && (
              <Button
                className="bg-green-500 hover:bg-green-600 hover:cursor-pointer w-20 ring-green-500 ring-4 hover:ring-green-600"
                type="submit"
                disabled={!canProceed}
              >
                Send
              </Button>
            )}
          </div>
        </form>
      )}
    </section>
  );
};

export default Page;
