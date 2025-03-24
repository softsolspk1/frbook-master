import { CheckCircle2 } from "lucide-react"

export function CourseFinishStep() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-500" />
      <h2 className="mt-6 text-2xl font-bold">Ready to Submit</h2>
      <p className="mt-2 max-w-md text-gray-500">
        You've completed all the required information for your new course. Click the Submit button below to create your
        course.
      </p>
      <p className="mt-6 text-sm text-gray-500">You can edit all course details after submission.</p>
    </div>
  )
}

