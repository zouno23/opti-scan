import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import ReportCard from "./ReportCard";

export default async function page() {
  const { userId } = await auth();
  const user = await db.user.findUnique({
    where: { clerkId: userId ?? "" },
    select: { id: true },
  });
  const reports = await db.report.findMany({
    where: { userId: user?.id ?? "" },
    include: { user: true },
  });
  return (
    <div>
      <h2 className="mb-2 text-3xl font-semibold  p-4"> My Reports</h2>
      <div className="grid grid-cols-3 gap-4">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}
