"use client";

import { useEffect, useState } from "react";

const QuoteBox = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const FallBackQuote =
    "Love is not a promise spoken, but a presence that proves itself in absence.";

  useEffect(() => {
    const getQuote = async () => {
      try {
        const res = await fetch("/api/quotes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setQuote(data.quote);
      } catch (err) {
        setQuote(null);
      }
    };
    getQuote();
  }, []);
  return (
    <p className="text-xl w-full lg:w-3/4 text-center font-bold">
      &ldquo;{quote ?? FallBackQuote}&ldquo;
    </p>
  );
};

export default QuoteBox;
