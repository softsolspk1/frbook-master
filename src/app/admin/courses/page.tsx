import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"

// Mock data for courses
const courses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    category: "Development",
    lessons: 12,
    sections: 4,
    enrolledStudents: 45,
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    category: "Programming",
    lessons: 15,
    sections: 5,
    enrolledStudents: 32,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    category: "Design",
    lessons: 10,
    sections: 3,
    enrolledStudents: 28,
  },
  {
    id: "4",
    title: "React for Beginners",
    category: "Development",
    lessons: 14,
    sections: 4,
    enrolledStudents: 56,
  },
  {
    id: "5",
    title: "Data Science Essentials",
    category: "Data Science",
    lessons: 18,
    sections: 6,
    enrolledStudents: 38,
  },
]

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Manage Courses</h1>
        <Link href="/admin/courses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search courses..." className="max-w-sm" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Serial No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Lessons & Sections</TableHead>
              <TableHead>Enrolled Students</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    {course.title}
                  </Link>
                </TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>
                  {course.lessons} lessons in {course.sections} sections
                </TableCell>
                <TableCell>{course.enrolledStudents}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/courses/${course.id}`}>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

