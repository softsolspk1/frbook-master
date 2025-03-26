import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, CheckCircle, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Expand Your Knowledge & Achieve Your Goals
            </h1>
            <p className="text-xl text-gray-600">
              Access high-quality courses taught by industry experts and take your skills to the next level.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Link href="/user/courses">
                <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center w-full sm:w-auto">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
              {/* <Link href="/register">
                <button className="border border-gray-300 bg-white px-4 py-2 rounded w-full sm:w-auto">
                  Sign Up for Free
                </button>
              </Link> */}
            </div>
          </div>
          <div className="flex-1">
            <Image
              src="/assets/images/Student_Learning.webp"
              alt="Students learning online"
              width={600}
              height={400}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-3xl font-bold">5+</h3>
                <p className="text-gray-600">Courses Available</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-3xl font-bold">3+</h3>
                <p className="text-gray-600">Active Students</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 sm:col-span-2 md:col-span-1">
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-3xl font-bold">95%</h3>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <p className="mt-4 text-gray-600">Explore our most popular courses</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Course Card 1 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=220&width=400"
                  alt="Introduction to Web Development"
                  width={400}
                  height={220}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Development
                  </span>
                  <span className="text-sm text-gray-500">Beginner</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">
                  <Link href="/user/courses/1" className="hover:text-blue-600">
                    Introduction to Web Development
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  Learn the fundamentals of web development including HTML, CSS, and JavaScript.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">$49.99</span>
                  <Link href="/user/courses/1">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">View Course</button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=220&width=400"
                  alt="UI/UX Design Fundamentals"
                  width={400}
                  height={220}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Design
                  </span>
                  <span className="text-sm text-gray-500">Beginner</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">
                  <Link href="/user/courses/3" className="hover:text-blue-600">
                    UI/UX Design Fundamentals
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  Learn the principles of user interface and user experience design.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">$59.99</span>
                  <Link href="/user/courses/3">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">View Course</button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=220&width=400"
                  alt="Business Analytics"
                  width={400}
                  height={220}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Business
                  </span>
                  <span className="text-sm text-gray-500">Intermediate</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">
                  <Link href="/user/courses/7" className="hover:text-blue-600">
                    Business Analytics
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  Learn how to analyze business data and make data-driven decisions.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">$69.99</span>
                  <Link href="/user/courses/7">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">View Course</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/user/courses">
              <button className="bg-blue-600 text-white px-6 py-2 rounded">View All Courses</button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Join thousands of students who are already learning and growing with our platform.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/user/courses">
              <button className="bg-white text-blue-600 px-6 py-3 rounded font-medium hover:bg-gray-100 w-full sm:w-auto">
                Browse Courses
              </button>
            </Link>
            <Link href="/register">
              <button className="border border-white text-white px-6 py-3 rounded font-medium hover:bg-blue-700 w-full sm:w-auto">
                Sign Up Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

