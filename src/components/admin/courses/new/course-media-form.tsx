"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

export function CourseMediaForm() {
  const [provider, setProvider] = useState("youtube")
  const [videoUrl, setVideoUrl] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("/placeholder.svg?height=250&width=400")

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Course Overview Provider</h3>
          <p className="text-sm text-gray-500">Select the provider for your course overview video</p>
        </div>

        <div className="space-y-2">
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger>
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="html5">HTML5 (MP4)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Course Overview URL</h3>
          <p className="text-sm text-gray-500">
            {provider === "youtube"
              ? "Enter the YouTube video URL for your course overview"
              : "Enter the MP4 video URL for your course overview"}
          </p>
        </div>

        <div className="space-y-2">
          <Input
            placeholder={
              provider === "youtube" ? "https://www.youtube.com/watch?v=..." : "https://example.com/video.mp4"
            }
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Course Thumbnail</h3>
          <p className="text-sm text-gray-500">Upload a thumbnail image for your course (400x250 pixels recommended)</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <Image
              src={thumbnailUrl || "/placeholder.svg"}
              alt="Course thumbnail"
              width={400}
              height={250}
              className="rounded-md border object-cover"
            />
          </div>

          <div className="flex items-center justify-center">
            <Label
              htmlFor="thumbnail-upload"
              className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed p-4 hover:bg-gray-50"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Thumbnail</span>
              <Input
                id="thumbnail-upload"
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
    </div>
  )
}

