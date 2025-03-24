"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Calendar, Edit, MessageSquare, Trash2 } from "lucide-react"

// Mock data for notices
const initialNotices = [
  {
    id: "1",
    title: "Course Update: New Lessons Added",
    description: "We've added 3 new lessons to the curriculum. Check them out in Section 2!",
    date: "2023-07-15",
    author: "Admin",
  },
  {
    id: "2",
    title: "Upcoming Live Session",
    description: "Join us for a live Q&A session on July 25th at 3:00 PM EST.",
    date: "2023-07-10",
    author: "Admin",
  },
]

interface NoticeboardTabProps {
  courseId: string
}

export function NoticeboardTab({ courseId }: NoticeboardTabProps) {
  const [notices, setNotices] = useState(initialNotices)
  const [newNoticeTitle, setNewNoticeTitle] = useState("")
  const [newNoticeDescription, setNewNoticeDescription] = useState("")

  const handleAddNotice = () => {
    if (newNoticeTitle.trim() === "" || newNoticeDescription.trim() === "") {
      return
    }

    const newNotice = {
      id: `notice-${Date.now()}`,
      title: newNoticeTitle,
      description: newNoticeDescription,
      date: new Date().toISOString().split("T")[0],
      author: "Admin",
    }

    setNotices([newNotice, ...notices])
    setNewNoticeTitle("")
    setNewNoticeDescription("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notice-title">Notice Title</Label>
              <Input
                id="notice-title"
                placeholder="Enter notice title"
                value={newNoticeTitle}
                onChange={(e) => setNewNoticeTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notice-description">Description</Label>
              <Textarea
                id="notice-description"
                placeholder="Enter notice description"
                rows={4}
                value={newNoticeDescription}
                onChange={(e) => setNewNoticeDescription(e.target.value)}
              />
            </div>
            <Button onClick={handleAddNotice}>Add New Notice</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Course Notices</h3>

        {notices.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <AlertCircle className="h-10 w-10 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No notices yet</h3>
            <p className="mt-1 text-sm text-gray-500">Add your first notice to communicate with students.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <Card key={notice.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <h4 className="font-medium">{notice.title}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{notice.date}</span>
                      </div>
                      <p className="mt-2 text-sm">{notice.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

