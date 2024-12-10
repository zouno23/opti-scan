import { db } from "@/server/db";
import ReportCard from "./ReportCard";
import AddReportModal from "./AddReportModal";
import SearchBar from "./SearchBar";

export default async function page({searchParams}:{searchParams:{patient:string}}) {
  const filter = searchParams.patient
  const reports = await db.report.findMany({
    where:{user:{
      name:{
        contains:filter
      }
    }},
    include: { user: true },
  });
  const patients = await db.user.findMany({ where:{
    role:"PATIENT"
  }});
  return (
    <div className="flex flex-col gap-8 p-16">
      <div className="w-full flex justify-between">
        <SearchBar/>
        <AddReportModal patients={patients}/>
      </div>
    <div className="grid-cols-3 grid gap-4">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
      </div>
  );
}
