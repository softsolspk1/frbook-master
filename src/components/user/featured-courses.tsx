import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for featured courses
const featuredCourses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
    image: "/assets/images/WebDevelopment.jpg",
    category: "Development",
    level: "Beginner",
    rating: 4.8,
    reviews: 245,
    instructor: "John Doe",
    price: 0, // Updated price
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts and modern frameworks like React and Vue.",
    image: "/assets/images/OIP.jpeg",
    category: "Development",
    level: "Intermediate",
    rating: 4.9,
    reviews: 189,
    instructor: "Jane Smith",
    price: 0, // Updated price
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design.",
    image: "/assets/images/Python-for-Data-Science-illustration.jpg",
    category: "Design",
    level: "Beginner",
    rating: 4.7,
    reviews: 156,
    instructor: "Robert Johnson",
    price: 0, // Updated price
  },
  {
    id: "4",
    title: "Data Science Essentials",
    description: "Introduction to data science, statistics, and machine learning concepts.",
    image: "/assets/images/Student_Learning.webp",
    category: "Data Science",
    level: "Intermediate",
    rating: 4.9,
    reviews: 210,
    instructor: "Emily Davis",
    price: 0, // Updated price
  },
]

export function FeaturedCourses() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
            <p className="text-muted-foreground">Explore our most popular courses</p>
          </div>
          <Link href="/user/courses">
            <Button variant="outline">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCourses.map((course) => (
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
                  <Badge variant="secondary">{course.category}</Badge>
                  <span className="text-sm text-muted-foreground">{course.level}</span>
                </div>
                <CardTitle className="line-clamp-1 text-lg">
                  <Link href={`/user/courses/${course.id}`} className="hover:underline">
                    {course.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(course.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                  </div>
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-sm text-muted-foreground">({course.reviews})</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Instructor: {course.instructor}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <span className="text-lg font-bold">${course.price}</span>
                <Link href={`/user/courses/${course.id}`}>
                  <Button size="sm">View Course</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

