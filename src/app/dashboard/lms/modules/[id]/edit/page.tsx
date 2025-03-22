"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WithUserLayout from "@/layout/WithUserLayout";
import { me, getModule, updateModule } from "@/api/client-operations";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import type { User } from "@/layout/LayoutTypes";

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  course_id: string;
  video_url?: string;
  document_url?: string;
  duration?: number;
  is_free?: boolean;
}

export default function EditModulePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [user, setUser] = useState<User | undefined>(undefined);
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [friends, setFriends] = useState<User[]>([]);
  const [notFriends, setNotFriends] = useState<User[]>([]);
  const [friendsLoading, setFriendsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Module>({
    id: "",
    title: "",
    description: "",
    order: 1,
    course_id: "",
    duration: 0,
    is_free: false
  });
  
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const [currentDocumentUrl, setCurrentDocumentUrl] = useState<string>("");

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
        const userData = await me();
        setUser(userData);
        // Check if user has admin role
        setIsAdmin(userData?.role === "admin");
        
        if (userData?.role !== "admin") {
          toast.error("You don't have permission to edit modules");
          router.push(`/dashboard/lms/modules/${id}`);
          return;
        }

        const moduleData = await getModule(id);
        if (!moduleData) throw new Error("Module not found");
        
        setModule(moduleData);
        setFormData(moduleData);
        
        if (moduleData.video_url) {
          setCurrentVideoUrl(moduleData.video_url);
        }
        
        if (moduleData.document_url) {
          setCurrentDocumentUrl(moduleData.document_url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load module data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    reloadAllFriends();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) || 0 }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleRemoveVideo = () => {
    setCurrentVideoUrl("");
    setFormData(prev => ({ ...prev, video_url: "" }));
  };

  const handleRemoveDocument = () => {
    setCurrentDocumentUrl("");
    setFormData(prev => ({ ...prev, document_url: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // First, upload files if any
      let videoUrl = currentVideoUrl;
      let documentUrl = currentDocumentUrl;
      
      if (videoFile) {
        // Upload video file and get URL
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('type', 'video');
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'jwt': localStorage.getItem('jwt') || ''
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          videoUrl = data.url;
        } else {
          throw new Error('Failed to upload video');
        }
      }
      
      if (documentFile) {
        // Upload document file and get URL
        const formData = new FormData();
        formData.append('file', documentFile);
        formData.append('type', 'document');
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'jwt': localStorage.getItem('jwt') || ''
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          documentUrl = data.url;
        } else {
          throw new Error('Failed to upload document');
        }
      }
      
      // Update module with file URLs
      const moduleData = {
        ...formData,
        video_url: videoUrl,
        document_url: documentUrl
      };
      
      const result = await updateModule(id, moduleData);
      
      if (result.success) {
        toast.success("Module updated successfully");
        router.push(`/dashboard/lms/modules/${id}`);
      } else {
        toast.error(result.message || "Failed to update module");
      }
    } catch (error) {
      console.error("Error updating module:", error);
      toast.error("Failed to update module");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) {
    return null; // Don't render anything if not admin
  }

  return (
    <WithUserLayout user={user} friends={friends} notfriends={notFriends} reloadFriends={reloadAllFriends} loaderName={loading ? "defaultLoader" : ""}>
      <div className="page-center">
        <div className="container-fluid section-t-space">
          <div className="page-content">
            <div className="content-center content-full w-100">
              <div className="row mb-4">
                <div className="col-12">
                  <Link href={`/dashboard/lms/modules/${id}`}>
                    <button className="btn btn-outline-secondary flex items-center">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Module
                    </button>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mb-4">
                  <h1 className="text-3xl font-bold">Edit Module</h1>
                  <p className="text-muted">Update module details</p>
                </div>
              </div>

              {!loading && module && (
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-md-6">
                              {/* Basic Information */}
                              <h5 className="mb-3">Basic Information</h5>
                              
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
                                  rows={5}
                                  required
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
                                      placeholder="Module order"
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
                            </div>
                            
                            <div className="col-md-6">
                              {/* Media */}
                              <h5 className="mb-3">Media</h5>
                              
                              <div className="form-group">
                                <label>Video</label>
                                <div className="card mb-3">
                                  <div className="card-body p-3">
                                    {currentVideoUrl ? (
                                      <div className="mb-3">
                                        <div className="alert alert-success mb-2">
                                          Current video: {currentVideoUrl.split('/').pop()}
                                        </div>
                                        <button 
                                          type="button" 
                                          className="btn btn-sm btn-outline-danger"
                                          onClick={handleRemoveVideo}
                                        >
                                          Remove Video
                                        </button>
                                      </div>
                                    ) : videoFile ? (
                                      <div className="alert alert-success mb-3">
                                        Video selected: {videoFile.name}
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
                                        onChange={handleVideoChange}
                                      />
                                      <label className="custom-file-label" htmlFor="video">
                                        {videoFile ? videoFile.name : "Choose new video"}
                                      </label>
                                    </div>
                                    
                                    <small className="form-text text-muted mt-2">
                                      Max file size: 100MB. Supported formats: MP4, WebM.
                                    </small>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="form-group">
                                <label>Document</label>
                                <div className="card">
                                  <div className="card-body p-3">
                                    {currentDocumentUrl ? (
                                      <div className="mb-3">
                                        <div className="alert alert-success mb-2">
                                          Current document: {currentDocumentUrl.split('/').pop()}
                                        </div>
                                        <button 
                                          type="button" 
                                          className="btn btn-sm btn-outline-danger"
                                          onClick={handleRemoveDocument}
                                        >
                                          Remove Document
                                        </button>
                                      </div>
                                    ) : documentFile ? (
                                      <div className="alert alert-success mb-3">
                                        Document selected: {documentFile.name}
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
                                        onChange={handleDocumentChange}
                                      />
                                      <label className="custom-file-label" htmlFor="document">
                                        {documentFile ? documentFile.name : "Choose new document"}
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
                          
                          <div className="d-flex justify-content-end mt-4">
                            <button
                              type="button"
                              onClick={() => router.push(`/dashboard/lms/modules/${id}`)}
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
                                  Updating...
                                </>
                              ) : "Update Module"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WithUserLayout>
  );
}