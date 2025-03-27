"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Clock, Edit, Facebook, Instagram, Linkedin, Mail, Phone, Twitter, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Mock user data
const userData = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  bio: "Frontend developer passionate about creating user-friendly interfaces and learning new technologies.",
  avatar: "/assets/images/pimage1.jpeg",
  location: "New York, USA",
  joinDate: "2023-01-15T00:00:00Z",
  social: {
    twitter: "johndoe",
    linkedin: "johndoe",
    facebook: "johndoe",
    instagram: "johndoe",
  },
  enrolledCourses: 3,
  completedCourses: 2,
  certificates: 2,
}

// Mock enrolled courses data
const enrolledCourses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    image: "/assets/images/WebDevelopment.jpg",
    instructor: "Jane Smith",
    progress: 35,
    lastAccessed: "2023-07-18T14:30:00Z",
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    image: "/assets/images/advanceJs.jpeg",
    instructor: "Robert Johnson",
    progress: 20,
    lastAccessed: "2023-07-15T10:15:00Z",
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    image: "/assets/images/uiux.jpeg",
    instructor: "Emily Davis",
    progress: 65,
    lastAccessed: "2023-07-17T09:45:00Z",
  },
]

// Mock certificates data
const certificates = [
  {
    id: "1",
    title: "HTML & CSS Basics",
    issueDate: "2023-06-10T00:00:00Z",
    image: "/assets/images/htmlcss.jpeg",
  },
  {
    id: "2",
    title: "Responsive Web Design",
    issueDate: "2023-05-22T00:00:00Z",
    image: "/assets/images/responsive.jpeg",
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    bio: userData.bio,
    location: userData.location,
    twitter: userData.social.twitter,
    linkedin: userData.social.linkedin,
    facebook: userData.social.facebook,
    instagram: userData.social.instagram,
  })

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the data to the backend here
    setIsEditing(false)
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Image
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                {isEditing && (
                  <Button variant="secondary" size="icon" className="absolute bottom-0 right-0 rounded-full">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <CardTitle>{userData.name}</CardTitle>
              <CardDescription>{userData.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-around">
                <div className="text-center">
                  <p className="text-2xl font-bold">{userData.enrolledCourses}</p>
                  <p className="text-sm text-muted-foreground">Enrolled</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{userData.completedCourses}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{userData.certificates}</p>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member since {new Date(userData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.phone}</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                {userData.social.twitter && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={`https://twitter.com/${userData.social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  </Button>
                )}
                {userData.social.linkedin && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={`https://linkedin.com/in/${userData.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                )}
                {userData.social.facebook && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={`https://facebook.com/${userData.social.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                  </Button>
                )}
                {userData.social.instagram && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={`https://instagram.com/${userData.social.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex-1">
                My Courses
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex-1">
                Certificates
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              {isEditing ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={formData.bio}
                          onChange={(e) => handleChange("bio", e.target.value)}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Social Media</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <div className="flex">
                              <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                                @
                              </span>
                              <Input
                                id="twitter"
                                value={formData.twitter}
                                onChange={(e) => handleChange("twitter", e.target.value)}
                                className="rounded-l-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <div className="flex">
                              <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                                in/
                              </span>
                              <Input
                                id="linkedin"
                                value={formData.linkedin}
                                onChange={(e) => handleChange("linkedin", e.target.value)}
                                className="rounded-l-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="facebook">Facebook</Label>
                            <div className="flex">
                              <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                                fb.com/
                              </span>
                              <Input
                                id="facebook"
                                value={formData.facebook}
                                onChange={(e) => handleChange("facebook", e.target.value)}
                                className="rounded-l-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <div className="flex">
                              <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                                @
                              </span>
                              <Input
                                id="instagram"
                                value={formData.instagram}
                                onChange={(e) => handleChange("instagram", e.target.value)}
                                className="rounded-l-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{userData.bio}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>Courses you're currently enrolled in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row">
                        <div className="h-40 w-full overflow-hidden rounded-md sm:h-auto sm:w-40">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            width={160}
                            height={90}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-semibold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{course.progress}% complete</span>
                            </div>
                            <Progress value={course.progress} />
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end justify-end">
                          <Button asChild>
                            <a href={`/my-learning/${course.id}`}>Continue</a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Certificates</CardTitle>
                  <CardDescription>Certificates you've earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {certificates.map((certificate) => (
                      <div key={certificate.id} className="overflow-hidden rounded-lg border">
                        <div className="aspect-video w-full overflow-hidden">
                          <Image
                            src={certificate.image || "/placeholder.svg"}
                            alt={certificate.title}
                            width={400}
                            height={225}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold">{certificate.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Issued on: {new Date(certificate.issueDate).toLocaleDateString()}
                          </p>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              Download
                            </Button>
                            <Button size="sm" className="flex-1">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="course-updates">Course Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about course updates and new content
                          </p>
                        </div>
                        <Switch id="course-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="announcements">Announcements</Label>
                          <p className="text-sm text-muted-foreground">Receive announcements from instructors</p>
                        </div>
                        <Switch id="announcements" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="promotions">Promotions</Label>
                          <p className="text-sm text-muted-foreground">Receive promotional emails and special offers</p>
                        </div>
                        <Switch id="promotions" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Privacy</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="profile-visibility">Profile Visibility</Label>
                          <p className="text-sm text-muted-foreground">Make your profile visible to other students</p>
                        </div>
                        <Switch id="profile-visibility" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-progress">Show Progress</Label>
                          <p className="text-sm text-muted-foreground">Show your course progress to instructors</p>
                        </div>
                        <Switch id="show-progress" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Actions</h3>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button variant="outline">Change Password</Button>
                      <Button variant="outline" className="text-red-500 hover:text-red-600">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

