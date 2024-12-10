"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import Uploader from "@/components/Uploader";
import { LoaderCircle } from "lucide-react";
import { AddReport, GenerateReport } from "./Report.server";
import { cn } from "@/lib/utils";

type ResponseType = {
  edges: string | null;
  mask: string | null;
  is_medical_image: boolean;
  tumor_detected: boolean;
};
const FormSchema = z.object({
  userId: z.string(),
  image: z.string(),
});
export default function AddReportModal({ patients }: { patients: User[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResponseType | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const OSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const user = patients.find((user) => user.id === values.userId);
      const request = {
        name: user?.name ?? "",
        age: user?.age ?? 0,
        image: values.image,
      } as {
        name: string;
        age: number;
        image: string;
      };
      const result = (await GenerateReport(request)) as ResponseType;
      setResult(result);
      const data = {
        userId: values.userId,
        images: [values.image, result?.mask, result?.edges].filter(
          (img) => img != null,
        ),
        result: !result.is_medical_image
          ? "Not a Medical Image"
          : result.tumor_detected
            ? "Tumor Detected"
            : "No Tumor Detected",
      };
      await AddReport(data);
      toast({
        title: "Report generated Succesfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "An error accured during the creation of your report",
        description: "please try again later",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Add Report
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[90dvh] flex-col items-center overflow-auto sm:max-w-[80dvw]">
        <DialogHeader>
          <DialogTitle>Add Report to a Patient</DialogTitle>
          <DialogDescription>
            Choose the patient and upload the image to get youur report
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-9/12 flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(OSubmit)}>
              <div className="grid w-full items-center gap-1.5 space-y-4">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patients</FormLabel>
                      <FormDescription>
                        Choose the patient you want to report
                      </FormDescription>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a patient" />
                          </SelectTrigger>
                          <SelectContent>
                            {patients.map((patient) => (
                              <SelectItem key={patient.id} value={patient.id}>
                                {patient.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormDescription>
                        Choose the Image you want to upload
                      </FormDescription>
                      <FormControl>
                        <Uploader
                          onUpload={(file) => field.onChange(file)}
                          Image={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(result && "hidden")}
                >
                  {loading && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}{" "}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
          {result && (
            <div className="grid w-full items-center gap-1.5 space-y-4 py-4">
              <div className="w-full space-y-2 text-lg font-semibold">
                Result :
                <p>
                  {" "}
                  {!result.is_medical_image
                    ? "Not a medicaL Image"
                    : result.tumor_detected
                      ? "Tumor Detected"
                      : "No Tumor Detected"}
                </p>
              </div>
              {result.is_medical_image && result.tumor_detected && (
                <>
                  <div className="w-full space-y-2 text-lg font-semibold">
                    mask :
                    <img
                      src={result?.mask ?? ""}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                  <div className="w-full space-y-2 text-lg font-semibold">
                    edges :
                    <img
                      src={result?.edges ?? ""}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                  </div>{" "}
                </>
              )}
              <div>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    form.reset();
                  }}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
