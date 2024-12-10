import { auth } from "@clerk/nextjs/server";
import AccountDataForm from "./AccountDataForm";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function page() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (user) {
    redirect(`/${user.role.toLowerCase()}`);
  }
  return (
    <div className="flex h-screen items-center justify-center w-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Account Details</CardTitle>
          <CardDescription>
            To be Able to to use the app u should fill this form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccountDataForm />
        </CardContent>
      </Card>
    </div>
  );
}
