import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock data for enrolled students
const enrolledStudents = [
  {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    enrollmentDate: "2023-05-15",
    photo: "/assets/images/pimage1.jpeg",
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    enrollmentDate: "2023-06-02",
    photo: "/assets/images/pimage2.jpeg",
  },
  {
    id: "3",
    name: "Robert Johnson",
    username: "robertj",
    email: "robert@example.com",
    enrollmentDate: "2023-06-10",
    photo: "/assets/images/pimage3.jpeg",
  },
  {
    id: "4",
    name: "David",
    username: "emilyd",
    email: "emily@example.com",
    enrollmentDate: "2023-06-18",
    photo: "/assets/images/pimage4.jpeg",
  },
  {
    id: "5",
    name: "Michael Wilson",
    username: "michaelw",
    email: "michael@example.com",
    enrollmentDate: "2023-07-05",
    photo: "/assets/images/pimage5.jpeg",
  },
]

interface EnrollListTabProps {
  courseId: string
}

export function EnrollListTab({ courseId }: EnrollListTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search students..." className="pl-8" />
        </div>
        <Button>Export List</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Photo</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrolledStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Image
                    src={student.photo || "/placeholder.svg"}
                    alt={student.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{student.username}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </TableCell>
                <TableCell>{student.enrollmentDate}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View Details
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

