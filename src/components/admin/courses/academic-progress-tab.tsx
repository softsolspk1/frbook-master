import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for student progress
const studentProgress = [
  {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    photo: "/assets/images/pimage1.jpeg",
    enrollmentDate: "2023-05-15",
    lastSeen: "2023-07-20",
    completedOn: null,
    progress: 75,
    completedLessons: 9,
    totalLessons: 12,
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    photo: "/assets/images/pimage2.jpeg",
    enrollmentDate: "2023-06-02",
    lastSeen: "2023-07-18",
    completedOn: "2023-07-15",
    progress: 100,
    completedLessons: 12,
    totalLessons: 12,
  },
  {
    id: "3",
    name: "Robert Johnson",
    username: "robertj",
    email: "robert@example.com",
    photo: "/assets/images/pimage3.jpeg",
    enrollmentDate: "2023-06-10",
    lastSeen: "2023-07-10",
    completedOn: null,
    progress: 50,
    completedLessons: 6,
    totalLessons: 12,
  },
  {
    id: "4",
    name: "David",
    username: "emilyd",
    email: "emily@example.com",
    photo: "/assets/images/pimage4.jpeg",
    enrollmentDate: "2023-06-18",
    lastSeen: "2023-07-19",
    completedOn: null,
    progress: 25,
    completedLessons: 3,
    totalLessons: 12,
  },
]

interface AcademicProgressTabProps {
  courseId: string
}

export function AcademicProgressTab({ courseId }: AcademicProgressTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search students..." className="pl-8" />
        </div>
        <Button>Export Progress</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Student</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentProgress.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={student.photo || "/placeholder.svg"}
                      alt={student.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{student.username}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">Enrollment From:</span> {student.enrollmentDate}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Last Seen on:</span> {student.lastSeen}
                    </div>
                    {student.completedOn && (
                      <div className="text-sm">
                        <span className="font-medium">Completed On:</span> {student.completedOn}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Progress value={student.progress} className="h-2" />
                    <div className="text-sm text-gray-500">
                      {student.completedLessons} out of {student.totalLessons} lessons completed
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Quiz Results
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

