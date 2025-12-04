import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center gap-3 p-4">
      <h2 className="text-4xl font-bold">
        <span className="text-red-500">404 </span>Not Found
      </h2>
      <p>Could not find requested resource</p>
      <Button variant="link" className="bg-accent">
        <Link href="/">Return Home</Link>
      </Button>
    </section>
  );
};

export default NotFound;
