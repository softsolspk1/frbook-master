"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, FileText, Info, ListChecks, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurriculumTab } from "@/components/admin/courses/curriculum-tab"
import { EnrollListTab } from "@/components/admin/courses/enroll-list-tab"
import { AcademicProgressTab } from "@/components/admin/courses/academic-progress-tab"
import { NoticeboardTab } from "@/components/admin/courses/noticeboard-tab"
import { BasicInfoTab } from "@/components/admin/courses/basic-info-tab"
import { CourseInfoTab } from "@/components/admin/courses/course-info-tab"

export default function CourseManager({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("curriculum")

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Course Manager</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="curriculum" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Curriculum</span>
          </TabsTrigger>
          <TabsTrigger value="enroll-list" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Enroll List</span>
          </TabsTrigger>
          <TabsTrigger value="academic-progress" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            <span className="hidden md:inline">Academic Progress</span>
          </TabsTrigger>
          <TabsTrigger value="noticeboard" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline">Noticeboard</span>
          </TabsTrigger>
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Basic</span>
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="hidden md:inline">Info</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum">
          <CurriculumTab courseId={params.id} />
        </TabsContent>

        <TabsContent value="enroll-list">
          <EnrollListTab courseId={params.id} />
        </TabsContent>

        <TabsContent value="academic-progress">
          <AcademicProgressTab courseId={params.id} />
        </TabsContent>

        <TabsContent value="noticeboard">
          <NoticeboardTab courseId={params.id} />
        </TabsContent>

        <TabsContent value="basic">
          <BasicInfoTab courseId={params.id} />
        </TabsContent>

        <TabsContent value="info">
          <CourseInfoTab courseId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

