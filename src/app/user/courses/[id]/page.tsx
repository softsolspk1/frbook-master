"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BookOpen, CheckCircle, Clock, Globe, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for course details
const courseDetails = {
  id: "1",
  title: "Introduction to Web Development",
  description:
    "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive course covers everything you need to know to get started with web development. From basic HTML and CSS to advanced JavaScript concepts, you'll learn how to build responsive and interactive websites from scratch.",
  image: "/placeholder.svg?height=400&width=800",
  category: "Development",
  level: "Beginner",
  rating: 4.8,
  reviews: 245,
  students: 12500,
  instructor: {
    name: "John Doe",
    bio: "Senior Web Developer with 10+ years of experience. John has worked with major tech companies and has taught over 50,000 students online.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  price: 49.99,
  duration: "10 hours",
  language: "English",
  lastUpdated: "June 2023",
  includes: [
    "10 hours on-demand video",
    "15 downloadable resources",
    "Full lifetime access",
    "Access on mobile and TV",
    "Certificate of completion",
  ],
  curriculum: [
    {
      id: "section-1",
      title: "Getting Started",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Introduction to the Course",
          duration: "5:20",
          type: "video",
        },
        {
          id: "lesson-1-2",
          title: "Setting Up Your Development Environment",
          duration: "12:45",
          type: "video",
        },
        {
          id: "lesson-1-3",
          title: "Web Development Overview",
          duration: "8:30",
          type: "video",
        },
        {
          id: "quiz-1",
          title: "Getting Started Quiz",
          duration: "10:00",
          type: "quiz",
        },
      ],
    },
    {
      id: "section-2",
      title: "HTML Fundamentals",
      lessons: [
        {
          id: "lesson-2-1",
          title: "HTML Document Structure",
          duration: "14:20",
          type: "video",
        },
        {
          id: "lesson-2-2",
          title: "HTML Elements and Attributes",
          duration: "18:15",
          type: "video",
        },
        {
          id: "lesson-2-3",
          title: "HTML Forms and Input Elements",
          duration: "22:10",
          type: "video",
        },
        {
          id: "assignment-1",
          title: "HTML Practice Assignment",
          duration: "30:00",
          type: "assignment",
        },
      ],
    },
    {
      id: "section-3",
      title: "CSS Basics",
      lessons: [
        {
          id: "lesson-3-1",
          title: "Introduction to CSS",
          duration: "15:30",
          type: "video",
        },
        {
          id: "lesson-3-2",
          title: "CSS Selectors and Properties",
          duration: "20:45",
          type: "video",
        },
        {
          id: "lesson-3-3",
          title: "CSS Box Model",
          duration: "16:20",
          type: "video",
        },
        {
          id: "quiz-2",
          title: "CSS Basics Quiz",
          duration: "15:00",
          type: "quiz",
        },
      ],
    },
  ],
  requirements: [
    "Basic computer skills",
    "No prior programming experience required",
    "A computer with internet access",
  ],
  outcomes: [
    "Build responsive websites from scratch",
    "Understand HTML, CSS, and JavaScript fundamentals",
    "Create interactive web pages",
    "Implement modern web design principles",
    "Deploy websites to production",
  ],
  faqs: [
    {
      question: "How long do I have access to the course?",
      answer: "You will have lifetime access to this course.",
    },
    {
      question: "Do I need any prior knowledge?",
      answer: "No, this course is designed for beginners. No prior knowledge is required.",
    },
    {
      question: "Is there a certificate upon completion?",
      answer: "Yes, you will receive a certificate of completion after finishing the course.",
    },
    {
      question: "Can I download the course materials?",
      answer: "Yes, all course materials are downloadable for offline viewing.",
    },
  ],
}

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-8">
      <div className="mb-4">
        <Link href="/user/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">{courseDetails.title}</h1>
            <p className="text-lg text-muted-foreground">{courseDetails.description.split(".")[0]}.</p>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <Badge variant="secondary">{courseDetails.category}</Badge>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{courseDetails.students.toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{courseDetails.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{courseDetails.language}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(courseDetails.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
              </div>
              <span className="text-sm font-medium">{courseDetails.rating}</span>
              <span className="text-sm text-muted-foreground">({courseDetails.reviews} reviews)</span>
            </div>
          </div>

          <div className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={courseDetails.image || "/placeholder.svg"}
              alt={courseDetails.title}
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="curriculum" className="flex-1">
                Curriculum
              </TabsTrigger>
              <TabsTrigger value="instructor" className="flex-1">
                Instructor
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="faqs" className="flex-1">
                FAQs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">Course Description</h3>
                  <p className="text-muted-foreground">{courseDetails.description}</p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">What You'll Learn</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {courseDetails.outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Requirements</h3>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    {courseDetails.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Course Content</h3>
                  <div className="text-sm text-muted-foreground">
                    {courseDetails.curriculum.reduce((total, section) => total + section.lessons.length, 0)} lessons •{" "}
                    {courseDetails.duration}
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {courseDetails.curriculum.map((section) => (
                    <AccordionItem key={section.id} value={section.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-1 items-center justify-between pr-4 text-left">
                          <span>{section.title}</span>
                          <span className="text-sm text-muted-foreground">{section.lessons.length} lessons</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {section.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                            >
                              <div className="flex items-center gap-2">
                                {lesson.type === "video" ? (
                                  <BookOpen className="h-4 w-4 text-primary" />
                                ) : lesson.type === "quiz" ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Clock className="h-4 w-4 text-blue-500" />
                                )}
                                <span>{lesson.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="instructor" className="mt-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <Image
                  src={courseDetails.instructor.avatar || "/placeholder.svg"}
                  alt={courseDetails.instructor.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold">{courseDetails.instructor.name}</h3>
                  <p className="mt-2 text-muted-foreground">{courseDetails.instructor.bio}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Student Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(courseDetails.rating)
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                    </div>
                    <span className="text-lg font-medium">{courseDetails.rating}</span>
                    <span className="text-muted-foreground">({courseDetails.reviews} reviews)</span>
                  </div>
                </div>

                <div className="rounded-lg border p-6 text-center">
                  <p className="text-lg font-medium">Reviews are only visible to enrolled students</p>
                  <p className="mt-2 text-muted-foreground">Enroll in this course to see what students are saying</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faqs" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>

                <Accordion type="single" collapsible className="w-full">
                  {courseDetails.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">${courseDetails.price}</CardTitle>
              <CardDescription>One-time payment, lifetime access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" size="lg">
                Enroll Now
              </Button>
              <p className="text-center text-sm text-muted-foreground">30-Day Money-Back Guarantee</p>

              <div className="space-y-2">
                <h4 className="font-medium">This course includes:</h4>
                <ul className="space-y-2">
                  {courseDetails.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

