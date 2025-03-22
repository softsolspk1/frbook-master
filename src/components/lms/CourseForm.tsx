"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Plus, Trash } from 'lucide-react';
import { createCourse, updateCourse, uploadFile } from "@/api/client-operations";

interface Course {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  long_description?: string;
  thumbnail: string;
  duration: number;
  is_published: boolean;
  instructor?: string;
  level?: string;
  prerequisites?: string[];
  tags?: string[];
  video_intro?: string;
  price?: number;
}

interface CourseFormProps {
  course?: Course | null;
  onSubmit?: (course: Course) => Promise<void>;
}

export function CourseForm({ course = null, onSubmit }: CourseFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Course>({
    id: course?.id || "" ,
    title: course?.title || "",
    description: course?.description || "",
    short_description: course?.short_description || "",
    long_description: course?.long_description || "",
    thumbnail: course?.thumbnail || "",
    duration: course?.duration || 0,
    is_published: course?.is_published || false,
    instructor: course?.instructor || "",
    level: course?.level || "",
    prerequisites: course?.prerequisites || [],
    tags: course?.tags || [],
    video_intro: course?.video_intro || "",
    price: course?.price || 0,
  });

  const [prerequisiteInput, setPrerequisiteInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    course?.thumbnail ? course.thumbnail : null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) || 0 }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setThumbnailPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const addPrerequisite = () => {
    if (!prerequisiteInput.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      prerequisites: [...(prev.prerequisites || []), prerequisiteInput.trim()]
    }));
    
    setPrerequisiteInput("");
  };

  const removePrerequisite = (index: number) => {
    setFormData(prev => {
      const prerequisites = [...(prev.prerequisites || [])];
      prerequisites.splice(index, 1);
      return { ...prev, prerequisites };
    });
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags || []), tagInput.trim()]
    }));
    
    setTagInput("");
  };

  const removeTag = (index: number) => {
    setFormData(prev => {
      const tags = [...(prev.tags || [])];
      tags.splice(index, 1);
      return { ...prev, tags };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, upload files if any
      let thumbnailUrl = formData.thumbnail;
      let videoIntroUrl = formData.video_intro;
      
      if (thumbnailFile) {
        // Upload thumbnail
        const result = await uploadFile(thumbnailFile, 'image');
        
        if (result.success) {
          thumbnailUrl = result.url;
        } else {
          toast.error("Failed to upload thumbnail");
          // Continue without thumbnail rather than failing completely
        }
      }
      
      if (videoFile) {
        // Upload video
        const result = await uploadFile(videoFile, 'video');
        
        if (result.success) {
          videoIntroUrl = result.url;
        } else {
          toast.error("Failed to upload video");
          // Continue without video rather than failing completely
        }
      }
      
      // Update course with new data including file URLs
      const updatedCourse = {
        ...formData,
        thumbnail: thumbnailUrl,
        video_intro: videoIntroUrl
      };

      if (onSubmit) {
        await onSubmit(updatedCourse);
      } else {
        let result;
        if (course?.id) {
          result = await updateCourse(updatedCourse);
        } else {
          result = await createCourse(updatedCourse);
        }

        if (result.success) {
          toast.success(course ? "Course updated successfully" : "Course created successfully");

          if (course) {
            router.push(`/dashboard/lms/courses/${course.id}`);
          } else {
            router.push("/dashboard/lms/courses");
          }
        } else {
          toast.error(result.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Error submitting course:", error);
      toast.error("An error occurred while saving the course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8">
              {/* Basic Information */}
              <h5 className="mb-3">Basic Information</h5>
              
              <div className="form-group">
                <label htmlFor="title">Course Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="short_description">Short Description</label>
                <input
                  id="short_description"
                  name="short_description"
                  type="text"
                  value={formData.short_description || ""}
                  onChange={handleChange}
                  placeholder="Brief description (displayed in course cards)"
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
                  placeholder="Enter course description"
                  rows={3}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="long_description">Detailed Description</label>
                <textarea
                  id="long_description"
                  name="long_description"
                  value={formData.long_description || ""}
                  onChange={handleChange}
                  placeholder="Detailed course description with curriculum overview"
                  rows={5}
                  className="form-control"
                />
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="instructor">Instructor</label>
                    <input
                      id="instructor"
                      name="instructor"
                      type="text"
                      value={formData.instructor || ""}
                      onChange={handleChange}
                      placeholder="Instructor name"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="level">Level</label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level || ""}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="duration">Duration (minutes)</label>
                    <input
                      id="duration"
                      name="duration"
                      type="number"
                      value={formData.duration}
                      onChange={handleNumberChange}
                      placeholder="Enter course duration in minutes"
                      min={0}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price || 0}
                      onChange={handleNumberChange}
                      placeholder="Enter course price (0 for free)"
                      min={0}
                      step="0.01"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <div className="custom-control custom-switch">
                  <input
                    id="is_published"
                    name="is_published"
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={handleCheckboxChange}
                    className="custom-control-input"
                  />
                  <label className="custom-control-label" htmlFor="is_published">
                    Publish course
                  </label>
                </div>
              </div>
              
              {/* Prerequisites */}
              <h5 className="mt-4 mb-3">Prerequisites</h5>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    value={prerequisiteInput}
                    onChange={(e) => setPrerequisiteInput(e.target.value)}
                    placeholder="Add a prerequisite"
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <button 
                      type="button" 
                      className="btn btn-outline-primary"
                      onClick={addPrerequisite}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {formData.prerequisites && formData.prerequisites.length > 0 && (
                <div className="mb-4">
                  <ul className="list-group">
                    {formData.prerequisites.map((prereq, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {prereq}
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removePrerequisite(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Tags */}
              <h5 className="mt-4 mb-3">Tags</h5>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <button 
                      type="button" 
                      className="btn btn-outline-primary"
                      onClick={addTag}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {formData.tags && formData.tags.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex flex-wrap">
                    {formData.tags.map((tag, index) => (
                      <div key={index} className="badge badge-light p-2 mr-2 mb-2 d-flex align-items-center">
                        {tag}
                        <button 
                          type="button" 
                          className="btn btn-sm p-0 ml-2"
                          onClick={() => removeTag(index)}
                        >
                          <Trash className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="col-md-4">
              {/* Media */}
              <h5 className="mb-3">Media</h5>
              
              <div className="form-group">
                <label>Thumbnail</label>
                <div className="card mb-3">
                  <div className="card-body p-3">
                    {thumbnailPreview ? (
                      <div className="position-relative mb-3">
                        <img 
                          src={thumbnailPreview || "/placeholder.svg"} 
                          alt="Thumbnail preview" 
                          className="img-fluid rounded"
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute"
                          style={{ top: "5px", right: "5px" }}
                          onClick={() => {
                            setThumbnailPreview(null);
                            setThumbnailFile(null);
                            setFormData(prev => ({ ...prev, thumbnail: "" }));
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-light rounded mb-3">
                        <p className="text-muted mb-0">No thumbnail</p>
                      </div>
                    )}
                    
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="thumbnail"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                      />
                      <label className="custom-file-label" htmlFor="thumbnail">
                        Choose thumbnail
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Introduction Video</label>
                <div className="card">
                  <div className="card-body p-3">
                    {formData.video_intro ? (
                      <div className="position-relative mb-3">
                        <video 
                          src={formData.video_intro} 
                          controls 
                          className="w-100 rounded"
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute"
                          style={{ top: "5px", right: "5px" }}
                          onClick={() => {
                            setVideoFile(null);
                            setFormData(prev => ({ ...prev, video_intro: "" }));
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-light rounded mb-3">
                        <p className="text-muted mb-0">No intro video</p>
                      </div>
                    )}
                    
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="video_intro"
                        accept="video/*"
                        onChange={handleVideoChange}
                      />
                      <label className="custom-file-label" htmlFor="video_intro">
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
          </div>
          
          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              onClick={() => router.push(course?.id ? `/dashboard/lms/courses/${course.id}` : "/dashboard/lms/courses")}
              className="btn btn-outline-secondary mr-2"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  {course?.id ? "Updating..." : "Creating..."}
                </>
              ) : (course?.id ? "Update Course" : "Create Course")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}