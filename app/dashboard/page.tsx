import Links from "@/components/Links";
import QuoteBox from "@/components/QuoteBox";
import Clock from "@/components/Clock";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const Page = async () => {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center flex-1">
        <section className="flex flex-col items-center justify-between w-5/6 lg:w-1/3 bg-white/20 backdrop-blur-md border border-white/10 shadow-xl px-2 lg:px-4 py-7 rounded-4xl gap-8">
          <Clock />
          <QuoteBox />
          <Links />
        </section>
      </main>
      <Toaster position="bottom-right" />
    </>
  );
};

export default Page;
