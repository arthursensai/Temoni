import Link from "next/link";

const Page = () => {
  return (
    <section className="relative w-full flex-col min-h-screen p-6 flex items-center justify-center">
      <div className="bg-black/30 backdrop-blur-xs text-center p-2 py-4 rounded-3xl">
        <h1 className="text-2xl self-center">Tomorrow&apos;s Letter</h1>
        <p className="text-white/80 my-4">
          Here you can find a letter send by you partner but you don&apos;t have
          any letter now.
        </p>
        <div className="w-full flex items-center justify-center gap-2">
          <Link
            href="/dashboard/tomorrowLetter/new"
            className="border-2 bg-white/80 text-black rounded-2xl py-2 px-4 font-bold hover:scale-110 transition-all"
          >
            Create one
          </Link>

          <Link
            href="/dashboard"
            className="border-2 border-white rounded-2xl py-2 px-4 hover:scale-110 transition-all"
          >
            Go Back
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;
