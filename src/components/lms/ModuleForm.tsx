"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { createModule, updateModule, uploadFile } from "@/api/client-operations"
import { Paperclip, Upload, X, Plus } from 'lucide-react'

// Define types
interface Video {
  id?: string
  title: string
  description: string
  url: string
  duration: number
  order: number
}

interface Document {
  id?: string
  title: string
  file_url: string
  file_type: string
  file_size: number
}

interface Module {
  id?: string
  course_id: string
  title: string
  description?: string
  order: number
  videos?: Video[]
  documents?: Document[]
  video_url?: string
  document_url?: string
  duration?: number
  is_free?: boolean
}

interface ModuleFormProps {
  module?: Module | null;
  courseId?: string;
  onSubmit?: (module: Module) => Promise<void>;
}

export function ModuleForm({ module = null, courseId, onSubmit }: ModuleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [uploadingDocument, setUploadingDocument] = useState(false)
  const [videos, setVideos] = useState<Video[]>(module?.videos || [])
  const [documents, setDocuments] = useState<Document[]>(module?.documents || [])
  const [newVideo, setNewVideo] = useState<Video>({
    title: "",
    description: "",
    url: "",
    duration: 0,
    order: videos.length + 1
  })
  
  const videoInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState<Module>({
    id: module?.id || undefined,
    title: module?.title || "",
    description: module?.description || "",
    order: module?.order || 1,
    course_id: module?.course_id || courseId || "",
    video_url: module?.video_url || "",
    document_url: module?.document_url || "",
    duration: module?.duration || 0,
    is_free: module?.is_free || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewVideo((prev) => ({ ...prev, [name]: value }))
  }

  const handleVideoNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewVideo((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingVideo(true)
    try {
      const result = await uploadFile(file, 'video');
      if (result.success) {
        setNewVideo(prev => ({ ...prev, url: result.url || "" }))
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

  const handleModuleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingVideo(true)
    try {
      const result = await uploadFile(file, 'video');
      if (result.success) {
        setFormData(prev => ({ ...prev, video_url: result.url || "" }))
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
      const result = await uploadFile(file, 'document');
      if (result.success) {
        const newDocument: Document = {
          title: file.name,
          file_url: result.url || "",
          file_type: file.type,
          file_size: file.size,
        }
        
        setDocuments(prev => [...prev, newDocument])
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

  const handleModuleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingDocument(true)
    try {
      const result = await uploadFile(file, 'document');
      if (result.success) {
        setFormData(prev => ({ ...prev, document_url: result.url || "" }))
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

  const addVideo = () => {
    if (!newVideo.title || !newVideo.url) {
      toast.error("Video title and URL are required")
      return
    }
    
    setVideos(prev => [...prev, { ...newVideo }])
    setNewVideo({
      title: "",
      description: "",
      url: "",
      duration: 0,
      order: videos.length + 2
    })
  }

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index))
  }

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Include videos and documents in the submission
      const moduleDataToSubmit = {
        ...formData,
        videos,
        documents
      }

      if (onSubmit) {
        await onSubmit(moduleDataToSubmit);
      } else {
        let result;
        if (module?.id) {
          result = await updateModule(module.id, moduleDataToSubmit);
        } else {
          result = await createModule(moduleDataToSubmit);
        }
  
        if (result.success) {
          toast.success(module ? "Module updated successfully" : "Module created successfully");
          router.push(module ? `/dashboard/lms/modules/${module.id}` : `/dashboard/lms/courses/${formData.course_id}`);
        } else {
          toast.error(result.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Error submitting module:", error);
      toast.error("An error occurred while saving the module");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Module Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter module title"
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
              placeholder="Enter module description"
              rows={3}
              className="form-control"
            />
          </div>

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
                  placeholder="Enter module order"
                  min={1}
                  className="form-control"
                />
                <small className="form-text text-muted">
                  The order in which this module appears in the course
                </small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="duration">Duration (minutes)</label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration || 0}
                  onChange={handleNumberChange}
                  placeholder="Enter duration in minutes"
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

          <hr className="my-4" />

          <h5 className="mb-3">Module Media</h5>
          
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Module Video</label>
                <div className="card mb-3">
                  <div className="card-body p-3">
                    {formData.video_url ? (
                      <div className="mb-3">
                        <div className="alert alert-success mb-2">
                          Current video: {formData.video_url.split('/').pop()}
                        </div>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setFormData(prev => ({ ...prev, video_url: "" }))}
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
                        id="module_video"
                        accept="video/*"
                        onChange={handleModuleVideoUpload}
                      />
                      <label className="custom-file-label" htmlFor="module_video">
                        Choose video
                      </label>
                    </div>
                    
                    <small className="form-text text-muted mt-2">
                      Max file size: 100MB. Supported formats: MP4, WebM.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group">
                <label>Module Document</label>
                <div className="card mb-3">
                  <div className="card-body p-3">
                    {formData.document_url ? (
                      <div className="mb-3">
                        <div className="alert alert-success mb-2">
                          Current document: {formData.document_url.split('/').pop()}
                        </div>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setFormData(prev => ({ ...prev, document_url: "" }))}
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
                        id="module_document"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={handleModuleDocumentUpload}
                      />
                      <label className="custom-file-label" htmlFor="module_document">
                        Choose document
                      </label>
                    </div>
                    
                    <small className="form-text text-muted mt-2">
                      Max file size: 20MB. Supported formats: PDF, DOC, DOCX, PPT, PPTX.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="mb-3">Additional Videos</h5>
          
          <div className="card mb-4">
            <div className="card-header">
              <h6 className="mb-0">Add New Video</h6>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="videoTitle">Video Title</label>
                <input
                  id="videoTitle"
                  name="title"
                  type="text"
                  value={newVideo.title}
                  onChange={handleVideoChange}
                  placeholder="Enter video title"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="videoDescription">Video Description</label>
                <textarea
                  id="videoDescription"
                  name="description"
                  value={newVideo.description}
                  onChange={handleVideoChange}
                  placeholder="Enter video description"
                  rows={2}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Video File</label>
                <div className="d-flex align-items-center mb-2">
                  {newVideo.url && (
                    <div className="mr-3">
                      <video 
                        src={newVideo.url} 
                        controls 
                        className="img-thumbnail" 
                        style={{ maxHeight: "150px", maxWidth: "250px" }}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="btn btn-outline-primary"
                    disabled={uploadingVideo}
                  >
                    {uploadingVideo ? (
                      <>Uploading... <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span></>
                    ) : (
                      <>Upload Video <Upload className="ml-2 h-4 w-4" /></>
                    )}
                  </button>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="d-none"
                  />
                </div>
                <input
                  id="videoUrl"
                  name="url"
                  type="text"
                  value={newVideo.url}
                  onChange={handleVideoChange}
                  placeholder="Or enter video URL directly"
                  className="form-control mt-2"
                />
              </div>

              <div className="form-group">
                <label htmlFor="videoDuration">Duration (minutes)</label>
                <input
                  id="videoDuration"
                  name="duration"
                  type="number"
                  value={newVideo.duration}
                  onChange={handleVideoNumberChange}
                  placeholder="Enter video duration in minutes"
                  min={0}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="videoOrder">Order</label>
                <input
                  id="videoOrder"
                  name="order"
                  type="number"
                  value={newVideo.order}
                  onChange={handleVideoNumberChange}
                  placeholder="Enter video order"
                  min={1}
                  className="form-control"
                />
              </div>

              <button
                type="button"
                onClick={addVideo}
                className="btn btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Video
              </button>
            </div>
          </div>

          {videos.length > 0 && (
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Added Videos</h6>
              </div>
              <div className="list-group list-group-flush">
                {videos.map((video, index) => (
                  <div key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{video.title}</h6>
                        <p className="mb-1 text-muted small">{video.description}</p>
                        <small className="text-muted">
                          Duration: {video.duration} min • Order: {video.order}
                        </small>
                      </div>
                      <div className="d-flex">
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <hr className="my-4" />

          <h5 className="mb-3">Additional Documents</h5>

          <div className="form-group">
            <div className="mb-3">
              <button
                type="button"
                onClick={() => documentInputRef.current?.click()}
                className="btn btn-outline-primary"
                disabled={uploadingDocument}
              >
                {uploadingDocument ? (
                  <>Uploading... <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span></>
                ) : (
                  <>Upload Document <Paperclip className="ml-2 h-4 w-4" /></>
                )}
              </button>
              <input
                ref={documentInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                onChange={handleDocumentUpload}
                className="d-none"
              />
            </div>
            
            {documents.length > 0 && (
              <div className="list-group mb-3">
                {documents.map((doc, index) => (
                  <div key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{doc.title}</h6>
                      <small className="text-muted">
                        {doc.file_type} • {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                      </small>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              onClick={() => router.push(module ? `/dashboard/lms/modules/${module.id}` : `/dashboard/lms/courses/${formData.course_id}`)}
              className="btn btn-outline-secondary mr-2"
            >
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Saving..." : module ? "Update Module" : "Create Module"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
