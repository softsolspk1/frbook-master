"use client"

import { useState } from "react"
import { Bell, BookOpen, CheckCircle, Clock, MessageSquare, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for notifications
const allNotifications = [
  {
    id: "1",
    type: "course_update",
    title: "New Content Added",
    message: "New lessons have been added to 'Introduction to Web Development'",
    course: "Introduction to Web Development",
    date: "2023-07-20T10:30:00Z",
    read: false,
  },
  {
    id: "2",
    type: "announcement",
    title: "Live Q&A Session",
    message: "Join us for a live Q&A session with the instructor on July 25th at 3:00 PM EST",
    course: "Advanced JavaScript",
    date: "2023-07-19T14:15:00Z",
    read: false,
  },
  {
    id: "3",
    type: "achievement",
    title: "Certificate Earned",
    message: "Congratulations! You've earned a certificate for completing 'HTML & CSS Basics'",
    course: "HTML & CSS Basics",
    date: "2023-07-18T09:45:00Z",
    read: true,
  },
  {
    id: "4",
    type: "reminder",
    title: "Continue Learning",
    message: "You haven't accessed 'UI/UX Design Fundamentals' in a while. Continue your progress!",
    course: "UI/UX Design Fundamentals",
    date: "2023-07-17T16:20:00Z",
    read: true,
  },
  {
    id: "5",
    type: "course_update",
    title: "Quiz Added",
    message: "A new quiz has been added to 'Advanced JavaScript'",
    course: "Advanced JavaScript",
    date: "2023-07-16T11:10:00Z",
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length
  const filteredNotifications = activeTab === "unread" ? notifications.filter((n) => !n.read) : notifications

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "course_update":
        return <BookOpen className="h-5 w-5 text-blue-500" />
      case "announcement":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case "achievement":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "reminder":
        return <Clock className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with course announcements and updates</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
          {unreadCount > 0 && <Badge variant="secondary">{unreadCount} unread</Badge>}
        </div>
      </div>

      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No notifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {activeTab === "unread" ? "You have no unread notifications" : "You have no notifications"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative rounded-lg border p-4 ${!notification.read ? "bg-muted/50" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{notification.title}</h3>
                        {!notification.read && <Badge variant="secondary">New</Badge>}
                      </div>
                      <p className="mt-1 text-muted-foreground">{notification.message}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline">{notification.course}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.date).toLocaleDateString()} at{" "}
                          {new Date(notification.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          Mark as read
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

