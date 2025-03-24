 "use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, FileImage, Info, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BasicInfoForm } from "@/components/admin/courses/new/basic-info-form"
import { CourseInfoForm } from "@/components/admin/courses/new/course-info-form"
import { CourseMediaForm } from "@/components/admin/courses/new/course-media-form"
import { CourseFinishStep } from "@/components/admin/courses/new/course-finish-step"

export default function AddNewCoursePage() {
  const [activeTab, setActiveTab] = useState("basic")

  const handleNext = () => {
    if (activeTab === "basic") setActiveTab("info")
    else if (activeTab === "info") setActiveTab("media")
    else if (activeTab === "media") setActiveTab("finish")
  }

  const handlePrevious = () => {
    if (activeTab === "info") setActiveTab("basic")
    else if (activeTab === "media") setActiveTab("info")
    else if (activeTab === "finish") setActiveTab("media")
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add New Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Course</CardTitle>
          <CardDescription>Fill in the details to create a new course</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Basic</span>
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="hidden md:inline">Info</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <FileImage className="h-4 w-4" />
                <span className="hidden md:inline">Media</span>
              </TabsTrigger>
              <TabsTrigger value="finish" className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span className="hidden md:inline">Finish</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicInfoForm />
            </TabsContent>

            <TabsContent value="info">
              <CourseInfoForm />
            </TabsContent>

            <TabsContent value="media">
              <CourseMediaForm />
            </TabsContent>

            <TabsContent value="finish">
              <CourseFinishStep />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={activeTab === "basic"}>
            Previous
          </Button>
          {activeTab === "finish" ? (
            <Button>Submit Course</Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

