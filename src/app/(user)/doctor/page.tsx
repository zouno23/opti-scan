import { FileText, Bell, Search, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SearchForPatient from "../_components/SearchForPatient";
import Link from "next/link";
export default function page() {
  return (
    <div className="flex items-center justify-center rounded-xl bg-gradient-to-b from-teal-100 to-white p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="mb-2 text-3xl font-bold text-teal-800">
            Patient Reports Dashboard
          </CardTitle>
          <CardDescription className="text-xl text-gray-600">
            Access and manage your patients&apos; medical reports efficiently
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-teal-100 p-3">
                <FileText className="h-8 w-8 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Comprehensive Reports</h3>
                <p className="text-gray-600">
                  Detailed patient health insights
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Real-time Updates</h3>
                <p className="text-gray-600">
                  Latest patient data at your fingertips
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-teal-50 p-6">
            <h3 className="mb-2 text-lg font-semibold">
              Quick Access Features:
            </h3>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Search patients by name, ID, or condition</li>
              <li>Filter reports by date, type, or urgency</li>
              <li>Add notes and recommendations directly to reports</li>
              <li>
                Share reports securely with other healthcare professionals
              </li>
            </ul>
          </div>

          <SearchForPatient />
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="mb-4 flex gap-4">
            <Link href={"/doctor/patients"}>
              <Button variant="outline" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Patient List
              </Button>
            </Link>
            <Button variant="outline" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </div>
          <p className="flex items-center text-sm text-gray-500">
            <Search className="mr-2 h-4 w-4" />
            Use advanced search for more specific patient queries
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
