"use client";

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
import { UploadButton } from "@/src/utils/uploadthing";

const Page = () => {
  const TotalSteps = 4;

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const [step, setStep] = useState(1);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [letterData, setLetterData] = useState<LetterSchema>({
    title: "",
    content: "",
    receiveDate: "21/12/2025",
    receiveTime: "12:00",
    cover: undefined,
  });

  const [error, setError] = useState<string | null>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const isLetterDataValid = letterSchema.parse(letterData);

      console.log(isLetterDataValid);
    
      //send the post request to the router

    } catch (err) {
      console.log(err)
      setError("error")
    }
  };

  return (
    <section className="relative w-full flex-col min-h-screen p-6 flex items-center justify-center">
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
            <p className="text-center w-full">Write a title for your letter</p>
            <Label>Letter title:</Label>
            <Input
              placeholder={`e.g: "To my dear person" `}
              onChange={(e) => {
                setLetterData((prev) => ({ ...prev, title: e.target.value }));
              }}
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
                      {date ? date.toLocaleDateString() : "Select date"}
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
                      onSelect={(date) => {
                        setDate(date);
                        setLetterData((prev) => ({
                          ...prev,
                          receiveDate: date
                            ? date.toISOString()
                            : prev.receiveDate,
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
                  defaultValue="10:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  onChange={(e) => {
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
            <p className="text-center w-full">Write your letter content here</p>
            <Label htmlFor="content">Letter content:</Label>
            <Input
              placeholder={`e.g: "Dear Lover..."`}
              id="content"
              onChange={(e) => {
                setLetterData((prev) => ({ ...prev, content: e.target.value }));
              }}
            />
          </>
        )}

        {step === 4 && (
          <>
            <p>Upload a cover for your Letter: </p>
            <Label>Letter cover:</Label>
            <UploadButton
              className="w-full flex items-center justify-center  py-7"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                const uploadedFile = res?.[0];

                if (!uploadedFile) return;

                setLetterData((prev) => ({
                  ...prev,
                  cover: uploadedFile?.ufsUrl,
                }));
              }}
              onUploadError={(error: Error) => {
                //here I may procceed with other stuff after an error
              }}
            />
          </>
        )}

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
                next();
              }}
            >
              Next
            </Button>
          )}

          {step === 4 && (
            <Button
              className="bg-green-500 hover:bg-green-600 hover:cursor-pointer w-20 ring-green-500 ring-4 hover:ring-green-600"
              type="submit"
            >
              Send
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Page;
