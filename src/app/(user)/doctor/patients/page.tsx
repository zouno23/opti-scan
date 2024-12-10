import { db } from "@/server/db";
import PatientsTable from "./PatientsTable";

export default async function page() {
  const users = await db.user.findMany({
    where: { role: "PATIENT" },
    include: { Report: true },
  });
  return (
    <>
      <h2 className="mb-2 text-3xl font-semibold  p-4"> Patients</h2>
      <PatientsTable patients={users} />
    </>
  );
}
