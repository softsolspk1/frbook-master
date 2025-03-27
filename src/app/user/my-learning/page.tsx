import Link from "next/link"
import Image from "next/image"
import { BookOpen, Clock, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    image: "/assets/images/WebDevelopment.jpg",
    instructor: "John Doe",
    progress: 35,
    lastAccessed: "2023-07-18T14:30:00Z",
    totalLessons: 12,
    completedLessons: 4,
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    image: "/assets/images/advanceJs.jpeg",
    instructor: "Jane Smith",
    progress: 20,
    lastAccessed: "2023-07-15T10:15:00Z",
    totalLessons: 15,
    completedLessons: 3,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    image: "/assets/images/uiux.jpeg",
    instructor: "Robert Johnson",
    progress: 65,
    lastAccessed: "2023-07-17T09:45:00Z",
    totalLessons: 10,
    completedLessons: 6,
  },
]

// Mock data for completed courses
const completedCourses = [
  {
    id: "4",
    title: "HTML & CSS Basics",
    image: "/assets/images/htmlcss.jpeg",
    instructor: "Emily Davis",
    completedDate: "2023-06-10T00:00:00Z",
    totalLessons: 8,
    certificate: true,
  },
  {
    id: "5",
    title: "Responsive Web Design",
    image: "/assets/images/responsive.jpeg",
    instructor: "Michael Wilson",
    completedDate: "2023-05-22T00:00:00Z",
    totalLessons: 10,
    certificate: true,
  },
]

export default function MyLearningPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Learning</h1>
          <p className="text-muted-foreground">Track your progress and continue learning</p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search your courses..." className="pl-8 w-full sm:w-[300px]" />
        </div>
      </div>

      <Tabs defaultValue="in-progress">
        <TabsList className="mb-6">
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress">
          {enrolledCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No courses in progress</h3>
              <p className="mt-2 text-sm text-muted-foreground">You haven't started any courses yet.</p>
              <Link href="/user/courses">
                <Button className="mt-4">Browse Courses</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={400}
                      height={220}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1 text-lg">
                      <Link href={`/user/my-learning/${course.id}`} className="hover:underline">
                        {course.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>Instructor: {course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{course.progress}% complete</span>
                        <span className="text-sm text-muted-foreground">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={`/user/my-learning/${course.id}`} className="w-full">
                      <Button className="w-full">Continue Learning</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No completed courses</h3>
              <p className="mt-2 text-sm text-muted-foreground">You haven't completed any courses yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={400}
                      height={220}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Completed</Badge>
                      {course.certificate && <Badge variant="outline">Certificate</Badge>}
                    </div>
                    <CardTitle className="line-clamp-1 text-lg">
                      <Link href={`/user/my-learning/${course.id}`} className="hover:underline">
                        {course.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>Instructor: {course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{course.totalLessons} lessons</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Completed on: {new Date(course.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex w-full gap-2">
                      <Link href={`/user/my-learning/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Review
                        </Button>
                      </Link>
                      {course.certificate && (
                        <Link href={`/certificates/${course.id}`} className="flex-1">
                          <Button className="w-full">View Certificate</Button>
                        </Link>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="archived">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <h3 className="text-lg font-medium">No archived courses</h3>
            <p className="mt-2 text-sm text-muted-foreground">You haven't archived any courses yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

