"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Report, type User } from "@prisma/client";
import EditModal from "./EditModal";

type FullUser = User & {
  Report: Report[];
};
export default function PatientsTable({ patients }: { patients: FullUser[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Age</TableHead>
          <TableHead className="text-center">Nb Reports</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-medium">{patient.name}</TableCell>
            <TableCell className="text-center">{patient.email}</TableCell>
            <TableCell className="text-center">{patient.age}</TableCell>
            <TableCell className="text-center">
              {patient.Report.length}
            </TableCell>
            <TableCell className="text-right">
              <EditModal user={patient} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
