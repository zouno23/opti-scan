import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { FileText, ArrowRight, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function page() {
  const { userId } = await auth();
  if (!userId) return;
  const user = await db.user.findUniqueOrThrow({ where: { clerkId: userId } });
  return (
    <div className="flex items-center justify-center rounded-xl bg-gradient-to-b from-blue-100 to-white p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="mb-2 text-3xl font-semibold ">
            Welcome Back,{" "}
            <span className="font-bold capitalize">{user.name} </span> <br />{" "}
            Your Medical Reports Are Ready
          </CardTitle>
          <CardDescription className="text-xl text-gray-600">
            Stay informed about your health with our latest updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Comprehensive Reports</h3>
                <p className="text-gray-600">
                  Detailed insights into your health
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Secure Access</h3>
                <p className="text-gray-600">
                  Your data is protected and private
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-6">
            <h3 className="mb-2 text-lg font-semibold">
              Why Check Your Reports?
            </h3>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Stay updated on your current health status</li>
              <li>Track progress and improvements over time</li>
              <li>Prepare questions for your next doctor&apos;s appointment</li>
              <li>Take proactive steps towards better health</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Link href="/patient/my-reports">
            <Button size="lg" className="mb-4 w-full md:w-auto">
                View Your Reports Now
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="flex items-center text-sm text-gray-500">
            <Bell className="mr-2 h-4 w-4" />
            We&apos;ll notify you when new reports are available
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
