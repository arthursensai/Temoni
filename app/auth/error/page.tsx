import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorPageProps {
  searchParams?: {
    error?: string;
  };
}

const AuthError = ({ searchParams }: ErrorPageProps) => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center gap-3 p-4">
      <h1>
        This app is currently under build and only a few allowed users can use
        it!
      </h1>
      <p className="mt-4 text-gray-400">
        تفاصيل الخطأ: {searchParams?.error ?? "Unknown"}
      </p>
      <Button variant="link" className="bg-accent">
        <Link href="/">Go back</Link>
      </Button>
    </section>
  );
};

export default AuthError;
