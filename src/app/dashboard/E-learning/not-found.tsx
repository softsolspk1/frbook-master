import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">E-Learning Dashboard</h1>
        <p className="text-gray-600">Page Not Found</p>
      </header>
      <h2 className="text-2xl font-bold mb-4">Not Found</h2>
      <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
      <Link href="/dashboard/E-learning/courses" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Return to Courses
      </Link>
    </div>
  )
}

