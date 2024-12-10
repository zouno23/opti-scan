import { type User, type Report } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ImageIcon, UserIcon } from 'lucide-react'
export default function ReportCard({report}:{report:Report & {user:User}}){
    return( <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Report</span>
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
            <h3 className="font-semibold mb-1">Result</h3>
            <p className="text-sm text-muted-foreground">{report.result}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <ImageIcon className="h-4 w-4 opacity-70 mr-2" />
              Images ({report.images.length})
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {report.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Report image ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>)
}