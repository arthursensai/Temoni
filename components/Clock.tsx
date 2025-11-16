"use client";

import { useEffect, useState } from "react";

const Clock = () => {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);

  useEffect(() => {
    const intervale = setInterval(() => {
      const newDate = new Date();

      setHour(newDate.getHours());
      setMinute(newDate.getMinutes());
    }, 1000);

    return () => {
      clearInterval(intervale);
    };
  }, []);

  return (
    <div className="text-7xl font-bold flex items-center justify-center gap-1">
      <p>{hour < 10 ? `0${hour}` : hour}</p>
      <div className="flex flex-col items-center justify-center gap-2 animate-pulse">
        <span className="self-center rounded-full w-3 h-3 bg-[#393D45] "></span>
        <span className="self-center rounded-full w-3 h-3 bg-[#393D45] "></span>
      </div>
      <p>{minute < 10 ? `0${minute}` : minute}</p>
    </div>
  );
};

export default Clock;
