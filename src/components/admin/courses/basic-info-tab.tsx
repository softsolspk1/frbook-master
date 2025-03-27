"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"

// Mock data for course
const courseData = {
  title: "Introduction to Web Development",
  shortDescription: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
  longDescription:
    "This comprehensive course covers everything you need to know to get started with web development. From basic HTML and CSS to advanced JavaScript concepts, you'll learn how to build responsive and interactive websites from scratch.",
  category: "development",
  level: "beginner",
  language: "english",
  instructors: [{ id: "1", name: "John Smith" }],
}

// Mock data for categories
const categories = [
  { id: "development", name: "Development" },
  { id: "design", name: "Design" },
  { id: "business", name: "Business" },
  { id: "marketing", name: "Marketing" },
  { id: "photography", name: "Photography" },
]

// Mock data for levels
const levels = [
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" },
  { id: "all-levels", name: "All Levels" },
]

// Mock data for languages
const languages = [
  { id: "english", name: "English" },
  { id: "spanish", name: "Spanish" },
  { id: "french", name: "French" },
  { id: "german", name: "German" },
  { id: "chinese", name: "Chinese" },
]

interface BasicInfoTabProps {
  courseId: string
}

export function BasicInfoTab({ courseId }: BasicInfoTabProps) {
  const [course, setCourse] = useState(courseData)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Instructors</h3>
              {/* <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Instructor
              </Button> */}
            </div>

            <div className="rounded-md border">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{course.instructors[0].name}</h4>
                    <p className="text-sm text-gray-500">Primary Instructor</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Course Details</h3>
              <p className="text-sm text-gray-500">Basic information about your course</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  value={course.title}
                  onChange={(e) => setCourse({ ...course, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="short-description">Short Description</Label>
                <Textarea
                  id="short-description"
                  rows={3}
                  value={course.shortDescription}
                  onChange={(e) => setCourse({ ...course, shortDescription: e.target.value })}
                />
                <p className="text-xs text-gray-500">A brief summary of your course (150-160 characters)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="long-description">Long Description</Label>
                <Textarea
                  id="long-description"
                  rows={6}
                  value={course.longDescription}
                  onChange={(e) => setCourse({ ...course, longDescription: e.target.value })}
                />
                <p className="text-xs text-gray-500">Detailed description of what students will learn</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={course.category} onValueChange={(value) => setCourse({ ...course, category: value })}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={course.level} onValueChange={(value) => setCourse({ ...course, level: value })}>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={course.language} onValueChange={(value) => setCourse({ ...course, language: value })}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.id} value={language.id}>
                          {language.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

