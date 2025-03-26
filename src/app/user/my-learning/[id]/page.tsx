"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  List,
  Maximize2,
  Pause,
  Play,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

// Mock data for course content
const courseContent = {
  id: "1",
  title: "Introduction to Web Development",
  progress: 35,
  currentLesson: "lesson-2-1",
  sections: [
    {
      id: "section-1",
      title: "Getting Started",
      completed: true,
      lessons: [
        {
          id: "lesson-1-1",
          title: "Introduction to the Course",
          duration: "5:20",
          type: "video",
          completed: true,
        },
        {
          id: "lesson-1-2",
          title: "Setting Up Your Development Environment",
          duration: "12:45",
          type: "video",
          completed: true,
        },
        {
          id: "lesson-1-3",
          title: "Web Development Overview",
          duration: "8:30",
          type: "video",
          completed: true,
        },
        {
          id: "quiz-1",
          title: "Getting Started Quiz",
          duration: "10:00",
          type: "quiz",
          completed: true,
        },
      ],
    },
    {
      id: "section-2",
      title: "HTML Fundamentals",
      completed: false,
      lessons: [
        {
          id: "lesson-2-1",
          title: "HTML Document Structure",
          duration: "14:20",
          type: "video",
          completed: false,
          current: true,
        },
        {
          id: "lesson-2-2",
          title: "HTML Elements and Attributes",
          duration: "18:15",
          type: "video",
          completed: false,
        },
        {
          id: "lesson-2-3",
          title: "HTML Forms and Input Elements",
          duration: "22:10",
          type: "video",
          completed: false,
        },
        {
          id: "assignment-1",
          title: "HTML Practice Assignment",
          duration: "30:00",
          type: "assignment",
          completed: false,
        },
      ],
    },
    {
      id: "section-3",
      title: "CSS Basics",
      completed: false,
      lessons: [
        {
          id: "lesson-3-1",
          title: "Introduction to CSS",
          duration: "15:30",
          type: "video",
          completed: false,
        },
        {
          id: "lesson-3-2",
          title: "CSS Selectors and Properties",
          duration: "20:45",
          type: "video",
          completed: false,
        },
        {
          id: "lesson-3-3",
          title: "CSS Box Model",
          duration: "16:20",
          type: "video",
          completed: false,
        },
        {
          id: "quiz-2",
          title: "CSS Basics Quiz",
          duration: "15:00",
          type: "quiz",
          completed: false,
        },
      ],
    },
  ],
  resources: [
    {
      id: "resource-1",
      title: "HTML Cheat Sheet",
      type: "PDF",
      size: "1.2 MB",
    },
    {
      id: "resource-2",
      title: "CSS Reference Guide",
      type: "PDF",
      size: "2.5 MB",
    },
    {
      id: "resource-3",
      title: "Course Slides",
      type: "ZIP",
      size: "15 MB",
    },
  ],
  notes: [
    {
      id: "note-1",
      lessonId: "lesson-1-2",
      content: "Remember to install Node.js and VS Code for the best development experience.",
      timestamp: "2023-07-15T10:30:00Z",
    },
    {
      id: "note-2",
      lessonId: "lesson-1-3",
      content: "The three pillars of web development: HTML (structure), CSS (presentation), JavaScript (behavior).",
      timestamp: "2023-07-16T14:20:00Z",
    },
  ],
}

// Find the current lesson
const currentSection = courseContent.sections.find((section) =>
  section.lessons.some((lesson) => lesson.id === courseContent.currentLesson),
)
const currentLesson = currentSection?.lessons.find((lesson) => lesson.id === courseContent.currentLesson)

export default function CourseLearningPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("content")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col">
      {/* Top Navigation */}
      <header className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <Link href="/user/my-learning">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to My Learning</span>
            </Button>
          </Link>
          <h1 className="text-lg font-medium">{courseContent.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={courseContent.progress} className="w-40" />
          <span className="text-sm text-muted-foreground">{courseContent.progress}% complete</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col">
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-16 w-16 rounded-full bg-primary/20 text-primary hover:bg-primary/30"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white">
                  <Play className="h-5 w-5" />
                </Button>
                <span className="text-sm text-white">00:00 / {currentLesson?.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white">
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{currentLesson?.title}</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <List className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] p-0">
                    <div className="flex h-full flex-col">
                      <div className="border-b p-4">
                        <h3 className="font-semibold">Course Content</h3>
                      </div>
                      <div className="flex-1 overflow-auto">
                        <Accordion
                          type="multiple"
                          defaultValue={courseContent.sections.map((section) => section.id)}
                          className="w-full"
                        >
                          {courseContent.sections.map((section) => (
                            <AccordionItem key={section.id} value={section.id}>
                              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                                <div className="flex flex-1 items-center justify-between pr-4 text-left">
                                  <span>{section.title}</span>
                                  {section.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pt-0">
                                <div className="space-y-1">
                                  {section.lessons.map((lesson) => (
                                    <button
                                      key={lesson.id}
                                      className={`flex w-full items-center justify-between rounded-md px-4 py-2 text-left text-sm ${
                                        lesson.current
                                          ? "bg-primary/10 font-medium text-primary"
                                          : lesson.completed
                                            ? "text-muted-foreground"
                                            : ""
                                      } hover:bg-muted`}
                                      onClick={() => setIsSidebarOpen(false)}
                                    >
                                      <div className="flex items-center gap-2">
                                        {lesson.type === "video" ? (
                                          <BookOpen className="h-4 w-4" />
                                        ) : lesson.type === "quiz" ? (
                                          <CheckCircle className="h-4 w-4" />
                                        ) : (
                                          <Clock className="h-4 w-4" />
                                        )}
                                        <span>{lesson.title}</span>
                                      </div>
                                      {lesson.completed ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">
                  Content
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex-1">
                  Resources
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex-1">
                  Notes
                </TabsTrigger>
                <TabsTrigger value="discussion" className="flex-1">
                  Discussion
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-4">
                <div className="prose max-w-none dark:prose-invert">
                  <h3>HTML Document Structure</h3>
                  <p>
                    In this lesson, we'll learn about the basic structure of an HTML document. HTML (HyperText Markup
                    Language) is the standard markup language for creating web pages.
                  </p>
                  <p>
                    Every HTML document has a required structure that includes the following declarations and elements:
                  </p>
                  <ul>
                    <li>
                      <strong>DOCTYPE declaration</strong>: Tells the browser which version of HTML the page is written
                      in.
                    </li>
                    <li>
                      <strong>html element</strong>: The root element that contains all other HTML elements.
                    </li>
                    <li>
                      <strong>head element</strong>: Contains meta information about the document.
                    </li>
                    <li>
                      <strong>title element</strong>: Specifies a title for the document.
                    </li>
                    <li>
                      <strong>body element</strong>: Contains the visible page content.
                    </li>
                  </ul>
                  <p>Here's a basic example of an HTML document structure:</p>
                  <pre>
                    <code>
                      {`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`}
                    </code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Course Resources</h3>
                  <div className="space-y-2">
                    {courseContent.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between rounded-md border p-3">
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {resource.type} • {resource.size}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-5 w-5" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">My Notes</h3>
                    <Button>Add Note</Button>
                  </div>
                  {courseContent.notes.length > 0 ? (
                    <div className="space-y-3">
                      {courseContent.notes.map((note) => (
                        <div key={note.id} className="rounded-md border p-3">
                          <p>{note.content}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <Badge variant="outline">
                              {
                                courseContent.sections.flatMap((s) => s.lessons).find((l) => l.id === note.lessonId)
                                  ?.title
                              }
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(note.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-md border border-dashed p-6 text-center">
                      <p className="text-muted-foreground">You haven't added any notes yet.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="discussion" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Discussion</h3>
                  <div className="rounded-md border border-dashed p-6 text-center">
                    <p className="text-muted-foreground">
                      No discussions for this lesson yet. Be the first to start a conversation!
                    </p>
                    <Button className="mt-4">Start Discussion</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sidebar - Course Content (visible on desktop) */}
        <div className="hidden w-80 flex-shrink-0 border-l md:block">
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <h3 className="font-semibold">Course Content</h3>
            </div>
            <div className="flex-1 overflow-auto">
              <Accordion
                type="multiple"
                defaultValue={courseContent.sections.map((section) => section.id)}
                className="w-full"
              >
                {courseContent.sections.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className="px-4 py-2 hover:no-underline">
                      <div className="flex flex-1 items-center justify-between pr-4 text-left">
                        <span>{section.title}</span>
                        {section.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0">
                      <div className="space-y-1">
                        {section.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            className={`flex w-full items-center justify-between rounded-md px-4 py-2 text-left text-sm ${
                              lesson.current
                                ? "bg-primary/10 font-medium text-primary"
                                : lesson.completed
                                  ? "text-muted-foreground"
                                  : ""
                            } hover:bg-muted`}
                          >
                            <div className="flex items-center gap-2">
                              {lesson.type === "video" ? (
                                <BookOpen className="h-4 w-4" />
                              ) : lesson.type === "quiz" ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <Clock className="h-4 w-4" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

