"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Key, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BasicInfoForm } from "@/components/admin/users/basic-info-form"
// import { LoginCredentialsForm } from "@/components/admin/users/login-credentials-form"
import { SocialInfoForm } from "@/components/admin/users/social-info-form"
import { FinishStep } from "@/components/admin/users/finish-step"

export default function AddNewAdminPage() {
  const [activeTab, setActiveTab] = useState("basic-info")

  const handleNext = () => {
    if (activeTab === "basic-info") setActiveTab("login-credentials")
    else if (activeTab === "login-credentials") setActiveTab("social-info")
    else if (activeTab === "social-info") setActiveTab("finish")
  }

  const handlePrevious = () => {
    if (activeTab === "login-credentials") setActiveTab("basic-info")
    else if (activeTab === "social-info") setActiveTab("login-credentials")
    else if (activeTab === "finish") setActiveTab("social-info")
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/users/admins">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add New Admin</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Admin Account</CardTitle>
          <CardDescription>Fill in the details to create a new admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic-info" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Basic Info</span>
              </TabsTrigger>
              <TabsTrigger value="login-credentials" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                <span className="hidden md:inline">Login Credentials</span>
              </TabsTrigger>
              <TabsTrigger value="social-info" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Social Info</span>
              </TabsTrigger>
              <TabsTrigger value="finish" className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span className="hidden md:inline">Finish</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info">
              <BasicInfoForm userType="admin" />
            </TabsContent>

            <TabsContent value="login-credentials">
              {/* <LoginCredentialsForm /> */}
            </TabsContent>

            <TabsContent value="social-info">
              <SocialInfoForm />
            </TabsContent>

            <TabsContent value="finish">
              <FinishStep userType="admin" />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={activeTab === "basic-info"}>
            Previous
          </Button>
          {activeTab === "finish" ? (
            <Button>Submit</Button>
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

