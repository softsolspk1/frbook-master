
"use client"

import { useEffect, useState, useCallback } from "react"
import { Container, Row, Col } from "reactstrap"
import WithUserLayout from "@/layout/WithUserLayout"
import type { User } from "@/layout/LayoutTypes"
import { courses } from "@/utils/courses"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, PlayCircle, Download, Lock } from "lucide-react"
import { notFound } from "next/navigation"

// Define the video interface to match the Course type
interface Video {
  title: string
  description: string
  url: string
  duration: string
}

// Define the page params type exactly as Next.js expects
interface PageParams {
  params: {
    courseId: string
  }
}

// Use the exact Next.js page component pattern
export default function Page({ params }: PageParams) {
  const [friends, setFriends] = useState<User[]>([])
  const [notFriends, setNotFriends] = useState<User[]>([])
  const [activeVideo, setActiveVideo] = useState<number>(0)
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set())

  const course = courses.find((c) => c.id === params.courseId)

  // Create a default user object
  const defaultUser: User = {
    id: 1, // Number instead of string
    name: "softsols",
    email: "softsolspk@gmail.com",
  }

  // Use useCallback to prevent reloadAllFr from changing on every render
  const reloadAllFr = useCallback(async () => {
    var resp = await fetch(`/api/friends`)
    if (resp.status === 200) {
      var data = await resp.json()
      setFriends(data)
    } else {
      setFriends([])
    }

    var resp2 = await fetch(`/api/notfriends`)
    if (resp2.status === 200) {
      var data2 = await resp2.json()
      setNotFriends(data2)
    } else {
      setNotFriends([])
    }
  }, [])

  useEffect(() => {
    reloadAllFr()

    // Check if user was previously enrolled (using localStorage)
    const enrollmentStatus = localStorage.getItem(`enrolled-${params.courseId}`)
    if (enrollmentStatus === "true") {
      setIsEnrolled(true)
    }

    // Load watched videos from localStorage
    const savedWatchedVideos = localStorage.getItem(`watched-${params.courseId}`)
    if (savedWatchedVideos) {
      try {
        // Parse the JSON array and ensure all elements are numbers
        const parsedVideos = JSON.parse(savedWatchedVideos)
        const numericVideos = parsedVideos.map((id: any) => Number(id))
        setWatchedVideos(new Set(numericVideos))
      } catch (error) {
        console.error("Error parsing watched videos:", error)
        setWatchedVideos(new Set())
      }
    }
  }, [params.courseId, reloadAllFr])

  // Update progress whenever watchedVideos changes
  useEffect(() => {
    if (course && watchedVideos.size > 0) {
      const newProgress = Math.round((watchedVideos.size / course.videos.length) * 100)
      setProgress(newProgress)

      // Save watched videos to localStorage
      localStorage.setItem(`watched-${params.courseId}`, JSON.stringify(Array.from(watchedVideos)))
    }
  }, [watchedVideos, course, params.courseId])

  if (!course) {
    notFound()
  }

  const handleEnroll = () => {
    setIsEnrolled(true)
    // Save enrollment status to localStorage
    localStorage.setItem(`enrolled-${params.courseId}`, "true")

    // Mark first video as watched
    const newWatchedVideos = new Set(watchedVideos)
    newWatchedVideos.add(0)
    setWatchedVideos(newWatchedVideos)
  }

  const handleVideoEnd = () => {
    // Mark current video as watched
    const newWatchedVideos = new Set(watchedVideos)
    newWatchedVideos.add(activeVideo)
    setWatchedVideos(newWatchedVideos)

    // Auto-play next video if available
    if (activeVideo < course.videos.length - 1) {
      setActiveVideo(activeVideo + 1)
    }
  }

  const handleVideoSelect = (index: number) => {
    setActiveVideo(index)
    // Mark video as watched when selected
    const newWatchedVideos = new Set(watchedVideos)
    newWatchedVideos.add(index)
    setWatchedVideos(newWatchedVideos)
  }

  const downloadResource = (resourceName: string) => {
    // In a real application, this would trigger a download
    // For now, we'll just show an alert
    alert(`Downloading ${resourceName} for ${course.title}`)

    // In a real application, you would use something like:
    // const link = document.createElement('a')
    // link.href = `/resources/${params.courseId}/${resourceName.toLowerCase().replace(/\s+/g, '-')}.pdf`
    // link.download = `${course.title} - ${resourceName}.pdf`
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
  }

  return (
    <WithUserLayout
      friends={friends}
      notfriends={notFriends}
      reloadFriends={reloadAllFr}
      loaderName="course-details"
      user={defaultUser}
    >
      <div className="page-center">
        <div className="pb-2">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <Link href=
              // "/dashboard/E-learning/courses"
              "/user/courses"
               className="flex items-center text-sm mb-4 hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to courses
              </Link>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {course.title}
              </h2>
            </div>
          </div>
        </div>
        <Container fluid className="px-0">
          <div className="page-content">
            <div className="content-center content-full w-100">
              <Row>
                <Col xl="8">
                  {/* Video Player */}
                  <div className="video-player mb-6">
                    {isEnrolled ? (
                      <>
                        <video
                          className="w-full rounded-lg"
                          controls
                          src={course.videos[activeVideo].url}
                          poster={course.image}
                          onEnded={handleVideoEnd}
                        >
                          Your browser does not support the video tag.
                        </video>
                        <h3 className="text-xl font-semibold mt-4">{course.videos[activeVideo].title}</h3>
                        <p className="text-gray-600">{course.videos[activeVideo].description}</p>
                      </>
                    ) : (
                      <div className="relative">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          width={800}
                          height={450}
                          className="w-full rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white rounded-lg">
                          <Lock className="h-16 w-16 mb-4" />
                          <h3 className="text-xl font-semibold">Enroll to Access Course Content</h3>
                          <p className="text-center max-w-md mt-2">
                            Unlock all {course.videos.length} videos and resources by enrolling in this course.
                          </p>
                          <button
                            onClick={handleEnroll}
                            className="mt-6 bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium"
                          >
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Video List */}
                  {isEnrolled && (
                    <div className="course-videos mb-6">
                      <h3 className="text-xl font-semibold mb-4">Course Videos</h3>
                      <div className="grid gap-4">
                        {course.videos.map((video: Video, index: number) => (
                          <div
                            key={index}
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                              activeVideo === index
                                ? "bg-primary/10 border border-primary"
                                : "bg-gray-50 hover:bg-gray-100"
                            }`}
                            onClick={() => handleVideoSelect(index)}
                          >
                            <div className="flex-shrink-0 mr-3 relative">
                              <PlayCircle
                                className={`h-10 w-10 ${activeVideo === index ? "text-primary" : "text-gray-400"}`}
                              />
                              {watchedVideos.has(index) && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{video.title}</h4>
                              <p className="text-sm text-gray-500">{video.duration}</p>
                            </div>
                            <div className="flex-shrink-0 text-xs">
                              {watchedVideos.has(index) ? (
                                <span className="text-green-500">Watched</span>
                              ) : (
                                <span className="text-gray-400">Unwatched</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Course Content */}
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold">Course Description</h3>
                    <p>{course.description}</p>
                    <h3 className="text-xl font-semibold">What You'll Learn</h3>
                    <ul>
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-semibold">Course Content</h3>
                    <p>{course.content}</p>
                  </div>
                </Col>
                <Col xl="4">
                  <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
                    <h3 className="text-xl font-semibold mb-4">Course Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Instructor</p>
                        <p className="font-medium">{course.instructor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Level</p>
                        <p className="font-medium">{course.level}</p>
                      </div>
                      <div className="pt-4">
                        {isEnrolled ? (
                          <div className="bg-green-100 text-green-800 p-2 rounded-md text-center font-medium">
                            Enrolled
                          </div>
                        ) : (
                          <button
                            onClick={handleEnroll}
                            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium"
                          >
                            Enroll Now
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Course Progress */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium mb-3">Course Progress</h4>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{progress}% Complete</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {watchedVideos.size} of {course.videos.length} videos watched
                      </p>
                    </div>

                    {/* Resources */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium mb-3">Resources</h4>
                      <ul className="space-y-2">
                        <li>
                          <button
                            onClick={() => downloadResource("Course Slides")}
                            className={`w-full text-left ${isEnrolled ? "text-primary" : "text-gray-400"} hover:underline flex items-center`}
                            disabled={!isEnrolled}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Course Slides
                            {!isEnrolled && <Lock className="w-3 h-3 ml-2" />}
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => downloadResource("Exercise Files")}
                            className={`w-full text-left ${isEnrolled ? "text-primary" : "text-gray-400"} hover:underline flex items-center`}
                            disabled={!isEnrolled}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Exercise Files
                            {!isEnrolled && <Lock className="w-3 h-3 ml-2" />}
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => downloadResource("Cheat Sheet")}
                            className={`w-full text-left ${isEnrolled ? "text-primary" : "text-gray-400"} hover:underline flex items-center`}
                            disabled={!isEnrolled}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Cheat Sheet
                            {!isEnrolled && <Lock className="w-3 h-3 ml-2" />}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </WithUserLayout>
  )
}