"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { BookOpen, FileText, GripVertical, Plus, Settings } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for sections and lessons
const initialSections = [
  {
    id: "section-1",
    title: "Getting Started",
    lessons: [
      { id: "lesson-1-1", title: "Introduction to the Course", type: "lesson" },
      { id: "lesson-1-2", title: "Setting Up Your Environment", type: "lesson" },
      { id: "quiz-1", title: "Getting Started Quiz", type: "quiz" },
    ],
  },
  {
    id: "section-2",
    title: "Core Concepts",
    lessons: [
      { id: "lesson-2-1", title: "Understanding the Basics", type: "lesson" },
      { id: "lesson-2-2", title: "Advanced Techniques", type: "lesson" },
      { id: "quiz-2", title: "Core Concepts Quiz", type: "quiz" },
    ],
  },
]

interface CurriculumTabProps {
  courseId: string
}

export function CurriculumTab({ courseId }: CurriculumTabProps) {
  const [sections, setSections] = useState(initialSections)
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false)
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false)
  const [isAddQuizOpen, setIsAddQuizOpen] = useState(false)
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null)

  const handleDragEnd = (result: DropResult) => {
    // Implement drag and drop logic here
    console.log(result)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Dialog open={isAddSectionOpen} onOpenChange={setIsAddSectionOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Section</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="section-title">Section Title</Label>
                <Input id="section-title" placeholder="Enter section title" />
              </div>
              <Button className="w-full" onClick={() => setIsAddSectionOpen(false)}>
                Add Section
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddLessonOpen} onOpenChange={setIsAddLessonOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Lesson</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="lesson-title">Lesson Title</Label>
                <Input id="lesson-title" placeholder="Enter lesson title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lesson-content">Lesson Content</Label>
                <Textarea id="lesson-content" placeholder="Enter lesson content" rows={5} />
              </div>
              <Button className="w-full" onClick={() => setIsAddLessonOpen(false)}>
                Add Lesson
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddQuizOpen} onOpenChange={setIsAddQuizOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Quiz
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-title">Quiz Title</Label>
                <Input id="quiz-title" placeholder="Enter quiz title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiz-description">Quiz Description</Label>
                <Textarea id="quiz-description" placeholder="Enter quiz description" rows={3} />
              </div>
              <Button className="w-full" onClick={() => setIsAddQuizOpen(false)}>
                Add Quiz
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Sort Sections
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          {sections.map((section) => (
            <Card key={section.id}>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="flex items-center text-lg">
                  <GripVertical className="mr-2 h-5 w-5 text-gray-400" />
                  {section.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentSectionId(section.id)
                      setIsAddLessonOpen(true)
                    }}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Lesson
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentSectionId(section.id)
                      setIsAddQuizOpen(true)
                    }}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Quiz
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={section.id}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {section.lessons.map((lesson, index) => (
                        <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex items-center justify-between rounded-md border p-3"
                            >
                              <div className="flex items-center">
                                <GripVertical className="mr-2 h-4 w-4 text-gray-400" />
                                {lesson.type === "lesson" ? (
                                  <BookOpen className="mr-2 h-4 w-4 text-blue-500" />
                                ) : (
                                  <FileText className="mr-2 h-4 w-4 text-green-500" />
                                )}
                                <span>{lesson.title}</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

