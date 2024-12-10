"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";

export default function SearchForPatient() {
  const [isPending, setTransition] = useTransition();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const searchForPatient = () => {
    setTransition(() => {
      router.push(`/doctor/reports?patient=${searchRef.current?.value}`);
    });
  };
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex-grow">
        <Input
          type="search"
          placeholder="Search patients..."
          ref={searchRef}
          className="w-full"
        />
      </div>
      <Button
        size="lg"
        className="w-full md:w-auto"
        onClick={searchForPatient}
        disabled={isPending}
      >
        {isPending ? (
        <>
          <span className="mr-2">Loading...</span>
          <span className="animate-spin">⏳</span>
        </>
      ) : (
        <>
          View Patient Reports
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
        )} 
      </Button>
    </div>
  );
}
