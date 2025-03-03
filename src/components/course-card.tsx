import Link from "next/link"
import Image from "next/image"
import type { Course } from "@/utils/courses"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/dashboard/E-learning/courses/${course.id}`}>
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-video">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2">{course.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{course.instructor}</p>
          <p className="text-sm text-gray-700 line-clamp-2 mb-4">{course.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{course.level}</span>
            <span className="text-sm text-gray-500">{course.duration}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

