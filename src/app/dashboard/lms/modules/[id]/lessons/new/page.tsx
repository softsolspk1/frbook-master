"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import WithUserLayout from "@/layout/WithUserLayout"
import { me, getModule, createLesson, uploadFile } from "@/api/client-operations"
import { toast } from "react-toastify"
import Link from "next/link"
import { ArrowLeft, Upload } from 'lucide-react'
import type { User } from "@/layout/LayoutTypes"

interface Module {
  id: string
  title: string
  course_id: string
}

interface LessonFormData {
  title: string
  description: string
  content?: string
  type: string
  order: number
  duration: number
  module_id: string
  video_url?: string
  document_url?: string
  is_free?: boolean
}

export default function NewLessonPage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params?.id as string

  const [user, setUser] = useState<User | undefined>(undefined)
  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [friends, setFriends] = useState<User[]>([])
  const [notFriends, setNotFriends] = useState<User[]>([])
  const [friendsLoading, setFriendsLoading] = useState(false)
  
  const [formData, setFormData] = useState<LessonFormData>({
    title: "",
    description: "",
    content: "",
    type: "video",
    order: 1,
    duration: 0,
    module_id: moduleId,
    is_free: false
  })
  
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [uploadingDocument, setUploadingDocument] = useState(false)

  const reloadAllFriends = async () => {
    setFriendsLoading(true);
    try {
      const resp = await fetch(`/api/friends`);
      setFriends(resp.status === 200 ? await resp.json() : []);
      const resp2 = await fetch(`/api/notfriends`);
      setNotFriends(resp2.status === 200 ? await resp2.json() : []);
    } catch (error) {
      console.error("Error fetching friends data:", error);
      setFriends([]);
      setNotFriends([]);
    } finally {
      setFriendsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await me()
        setUser(userData)
        setIsAdmin(userData?.role === "admin")
        
        if (userData?.role !== "admin") {
          toast.error("You don't have permission to create lessons")
          router.push(`/dashboard/lms/modules/${moduleId}`)
          return
        }

        const moduleData = await getModule(moduleId)
        setModule(moduleData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load module data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    reloadAllFriends()
  }, [moduleId, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }
  
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingVideo(true)
    try {
      const result = await uploadFile(file, 'video')
      if (result.success) {
        setFormData(prev => ({ ...prev, video_url: result.url }))
        setVideoFile(file)
        toast.success("Video uploaded successfully")
      } else {
        toast.error(result.message || "Failed to upload video")
      }
    } catch (error) {
      console.error("Error uploading video:", error)
      toast.error("An error occurred while uploading the video")
    } finally {
      setUploadingVideo(false)
    }
  }
  
  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingDocument(true)
    try {
      const result = await uploadFile(file, 'document')
      if (result.success) {
        setFormData(prev => ({ ...prev, document_url: result.url }))
        setDocumentFile(file)
        toast.success("Document uploaded successfully")
      } else {
        toast.error(result.message || "Failed to upload document")
      }
    } catch (error) {
      console.error("Error uploading document:", error)
      toast.error("An error occurred while uploading the document")
    } finally {
      setUploadingDocument(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createLesson(formData)

      if (result.success) {
        toast.success("Lesson created successfully")
        router.push(`/dashboard/lms/modules/${moduleId}`)
      } else {
        toast.error(result.message || "An error occurred")
      }
    } catch (error) {
      console.error("Error submitting lesson:", error)
      toast.error("An error occurred while saving the lesson")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAdmin) {
    return null; // Don't render anything if not admin
  }

  return (
    <WithUserLayout user={user} friends={friends} notfriends={notFriends} reloadFriends={reloadAllFriends} loaderName={loading ? "defaultLoader" : ""}>
      <div className="content-center">
        <div className="container-fluid section-t-space px-0">
          <div className="page-content">
            <div className="content-center w-100">
              <div className="row mb-4">
                <div className="col-12">
                  <Link href={`/dashboard/lms/modules/${moduleId}`}>
                    <button className="btn btn-outline-secondary">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Module
                    </button>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mb-4">
                  <h1 className="text-3xl font-bold">Create New Lesson</h1>
                  <p className="text-muted">
                    Add a new lesson to {module ? `"${module.title}"` : "this module"}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="title">Lesson Title</label>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter lesson title"
                            required
                            className="form-control"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter lesson description"
                            rows={3}
                            required
                            className="form-control"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="type">Lesson Type</label>
                          <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="video">Video</option>
                            <option value="text">Text</option>
                            <option value="document">Document</option>
                            <option value="quiz">Quiz</option>
                            <option value="assignment">Assignment</option>
                          </select>
                        </div>
                        
                        {formData.type === 'text' && (
                          <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea
                              id="content"
                              name="content"
                              value={formData.content || ""}
                              onChange={handleChange}
                              placeholder="Enter lesson content"
                              rows={10}
                              className="form-control"
                            />
                          </div>
                        )}
                        
                        {formData.type === 'video' && (
                          <div className="form-group">
                            <label>Video</label>
                            <div className="card mb-3">
                              <div className="card-body p-3">
                                {formData.video_url ? (
                                  <div className="mb-3">
                                    <div className="alert alert-success mb-2">
                                      Video selected: {videoFile?.name || formData.video_url.split('/').pop()}
                                    </div>
                                    <video 
                                      src={formData.video_url} 
                                      controls 
                                      className="w-100 rounded mb-2" 
                                      style={{ maxHeight: "200px" }}
                                    />
                                    <button 
                                      type="button" 
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => {
                                        setFormData(prev => ({ ...prev, video_url: "" }));
                                        setVideoFile(null);
                                      }}
                                    >
                                      Remove Video
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center p-4 bg-light rounded mb-3">
                                    <p className="text-muted mb-0">No video selected</p>
                                  </div>
                                )}
                                
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    id="video"
                                    accept="video/*"
                                    onChange={handleVideoUpload}
                                    disabled={uploadingVideo}
                                  />
                                  <label className="custom-file-label" htmlFor="video">
                                    {uploadingVideo ? "Uploading..." : "Choose video"}
                                  </label>
                                </div>
                                
                                <small className="form-text text-muted mt-2">
                                  Max file size: 100MB. Supported formats: MP4, WebM.
                                </small>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {formData.type === 'document' && (
                          <div className="form-group">
                            <label>Document</label>
                            <div className="card mb-3">
                              <div className="card-body p-3">
                                {formData.document_url ? (
                                  <div className="mb-3">
                                    <div className="alert alert-success mb-2">
                                      Document selected: {documentFile?.name || formData.document_url.split('/').pop()}
                                    </div>
                                    <button 
                                      type="button" 
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => {
                                        setFormData(prev => ({ ...prev, document_url: "" }));
                                        setDocumentFile(null);
                                      }}
                                    >
                                      Remove Document
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center p-4 bg-light rounded mb-3">
                                    <p className="text-muted mb-0">No document selected</p>
                                  </div>
                                )}
                                
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    id="document"
                                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                                    onChange={handleDocumentUpload}
                                    disabled={uploadingDocument}
                                  />
                                  <label className="custom-file-label" htmlFor="document">
                                    {uploadingDocument ? "Uploading..." : "Choose document"}
                                  </label>
                                </div>
                                
                                <small className="form-text text-muted mt-2">
                                  Max file size: 20MB. Supported formats: PDF, DOC, DOCX, PPT, PPTX.
                                </small>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="order">Order</label>
                              <input
                                id="order"
                                name="order"
                                type="number"
                                value={formData.order}
                                onChange={handleNumberChange}
                                placeholder="Enter lesson order"
                                min={1}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="duration">Duration (minutes)</label>
                              <input
                                id="duration"
                                name="duration"
                                type="number"
                                value={formData.duration}
                                onChange={handleNumberChange}
                                placeholder="Enter lesson duration in minutes"
                                min={0}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <div className="custom-control custom-switch">
                            <input
                              id="is_free"
                              name="is_free"
                              type="checkbox"
                              checked={formData.is_free || false}
                              onChange={handleCheckboxChange}
                              className="custom-control-input"
                            />
                            <label className="custom-control-label" htmlFor="is_free">
                              Free preview (available without enrollment)
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                          <button
                            type="button"
                            onClick={() => router.push(`/dashboard/lms/modules/${moduleId}`)}
                            className="btn btn-outline-secondary mr-2"
                          >
                            Cancel
                          </button>
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Saving...
                              </>
                            ) : "Create Lesson"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithUserLayout>
  );
}