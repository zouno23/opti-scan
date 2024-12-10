import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { EditAccountForm } from "./EditAccountForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function page() {
  const { userId } = await auth();
  if (!userId) return;
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return;
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Edit Account</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditAccountForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
