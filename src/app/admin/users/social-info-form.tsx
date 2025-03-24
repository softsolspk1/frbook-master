"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Linkedin, Twitter } from "lucide-react"

export function SocialInfoForm() {
  const [formData, setFormData] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
  })

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
          <h3 className="text-lg font-medium">Social Information</h3>
          <p className="text-sm text-gray-500">Add social media profiles (optional)</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4 text-blue-600" />
              Facebook URL
            </Label>
            <Input
              id="facebook"
              placeholder="https://facebook.com/username"
              value={formData.facebook}
              onChange={(e) => handleChange("facebook", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4 text-blue-400" />
              Twitter URL
            </Label>
            <Input
              id="twitter"
              placeholder="https://twitter.com/username"
              value={formData.twitter}
              onChange={(e) => handleChange("twitter", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-blue-700" />
              LinkedIn URL
            </Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

