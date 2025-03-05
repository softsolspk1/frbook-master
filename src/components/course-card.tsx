
import Link from "next/link"
import Image from "next/image"
import type { Course } from "@/utils/courses"
import { PlayCircle } from "lucide-react"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/dashboard/E-learning/courses/${course.id}`}>
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-video">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <PlayCircle className="h-16 w-16 text-white" />
          </div>
          <div className="absolute bottom-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
            {course.videos.length} videos
          </div>
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