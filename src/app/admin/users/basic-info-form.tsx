"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

interface BasicInfoFormProps {
  userType: "admin" | "student"
}

export function BasicInfoForm({ userType }: BasicInfoFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    biography: "",
    phone: "",
    address: "",
  })

  const [photoUrl, setPhotoUrl] = useState("/placeholder.svg?height=100&width=100")

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Personal Information</h3>
          <p className="text-sm text-gray-500">Basic information about the {userType}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="biography">Biography</Label>
          <Textarea
            id="biography"
            placeholder={`Enter ${userType} biography`}
            rows={4}
            value={formData.biography}
            onChange={(e) => handleChange("biography", e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Profile Image</h3>
          <p className="text-sm text-gray-500">Upload a profile image for the {userType}</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Image
            src={photoUrl || "/placeholder.svg"}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full border object-cover"
          />

          <Label
            htmlFor="photo-upload"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed p-4 hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Photo</span>
            <Input
              id="photo-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                // In a real app, you would handle file upload here
                console.log("File selected:", e.target.files?.[0])
              }}
            />
          </Label>
        </div>
      </div>
    </div>
  )
}

