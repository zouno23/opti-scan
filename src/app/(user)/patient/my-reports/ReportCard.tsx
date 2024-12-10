import { type User, type Report } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ImageIcon, UserIcon } from "lucide-react";
export default function ReportCard({
  report,
}: {
  report: Report & { user: User };
}) {
  return (
    <Card className="w-full max-w-md col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Report{report.id.slice(8, 13)}</span>
          <Badge variant="outline">{report.id.slice(0, 8)}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <UserIcon className="h-4 w-4 opacity-70" />
          <span className="text-sm font-medium">User: {report.user.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4 opacity-70" />
          <span className="text-sm">{report.date.toLocaleDateString()}</span>
        </div>
        <div>
          <h3 className="mb-1 font-semibold">Result</h3>
          <p className="text-sm text-muted-foreground capitalize">{report.result}</p>
        </div>
        <div>
          <h3 className="mb-2 flex items-center font-semibold">
            <ImageIcon className="mr-2 h-4 w-4 opacity-70" />
            Images ({report.images.length})
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {report.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Report image ${index + 1}`}
                className="h-20 w-full rounded object-cover"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
