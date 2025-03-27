import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus, Search, Trash2 } from "lucide-react"

// Mock data for students
const students = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    photo: "/assets/images/pimage1.jpeg",
    enrolledCourses: 3,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    photo: "/assets/images/pimage2.jpeg",
    enrolledCourses: 2,
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "+1 (555) 456-7890",
    photo: "/assets/images/pimage3.jpeg",
    enrolledCourses: 1,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 234-5678",
    photo: "/assets/images/pimage4.jpeg",
    enrolledCourses: 4,
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@example.com",
    phone: "+1 (555) 876-5432",
    photo: "/assets/images/pimage5.jpeg",
    enrolledCourses: 2,
  },
]

export default function StudentsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Manage Students</h1>
        <Link href="/admin/users/students/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search students..." className="pl-8" />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Serial No.</TableHead>
              <TableHead className="w-[80px]">Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Enrolled Courses</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <Image
                    src={student.photo || "/placeholder.svg"}
                    alt={student.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.enrolledCourses}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

