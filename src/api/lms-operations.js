import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

// Course Operations
export const getCourses = async (category = "", search = "", page = 1, limit = 10) => {
  let url = `${process.env.API_BASE}/courses?page=${page}&limit=${limit}`
  if (category) url += `&category=${category}`
  if (search) url += `&search=${search}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      jwt: cookies().has("jwt") ? cookies().get("jwt").value : "",
    },
    next: { tags: ["courses"] },
  })

  if (res.status === 200) {
    const data = await res.json()
    return data
  }
  return { courses: [], pagination: { total: 0, page: 1, limit: 10, pages: 0 } }
}

export const getCourse = async (id) => {
  const res = await fetch(`${process.env.API_BASE}/courses/${id}`, {
    method: "GET",
    headers: {
      jwt: cookies().has("jwt") ? cookies().get("jwt").value : "",
    },
    next: { tags: [`course-${id}`] },
  })

  if (res.status === 200) {
    const data = await res.json()
    return data
  }
  return null
}

export const createCourse = async (courseData) => {
  const res = await fetch(`${process.env.API_BASE}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      jwt: cookies().get("jwt").value,
    },
    body: JSON.stringify(courseData),
  })

  if (res.status === 200) {
    const data = await res.json()
    revalidateTag("courses")
    return { success: true, course: data }
  }
  return { success: false, message: "Failed to create course" }
}

export const updateCourse = async (id, courseData) => {
  const res = await fetch(`${process.env.API_BASE}/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      jwt: cookies().get("jwt").value,
    },
    body: JSON.stringify(courseData),
  })

  if (res.status === 200) {
    const data = await res.json()
    revalidateTag(`course-${id}`)
    revalidateTag("courses")
    return { success: true, course: data }
  }
  return { success: false, message: "Failed to update course" }
}

export const enrollCourse = async (id) => {
  const res = await fetch(`${process.env.API_BASE}/courses/${id}/enroll`, {
    method: "POST",
    headers: {
      jwt: cookies().get("jwt").value,
    },
  })

  if (res.status === 200) {
    const data = await res.json()
    revalidateTag(`course-${id}`)
    revalidateTag("my-courses")
    return { success: true, enrollment: data }
  }
  return { success: false, message: "Failed to enroll in course" }
}

// My Courses Operations
export const getMyCourses = async () => {
  const res = await fetch(`${process.env.API_BASE}/my-courses`, {
    method: "GET",
    headers: {
      jwt: cookies().get("jwt").value,
    },
    next: { tags: ["my-courses"] },
  })

  if (res.status === 200) {
    const data = await res.json()
    return data
  }
  return { enrollments: [] }
}

export const updateProgress = async (courseId, progress, lessonId) => {
  const formData = new URLSearchParams()
  formData.append("progress", progress)
  if (lessonId) formData.append("lesson_id", lessonId)

  const res = await fetch(`${process.env.API_BASE}/my-courses/${courseId}/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      jwt: cookies().get("jwt").value,
    },
    body: formData,
  })

  if (res.status === 200) {
    const data = await res.json()
    revalidateTag("my-courses")
    return { success: true, enrollment: data }
  }
  return { success: false, message: "Failed to update progress" }
}

// Category Operations
export const getCategories = async () => {
  const res = await fetch(`${process.env.API_BASE}/categories`, {
    method: "GET",
    next: { tags: ["categories"] },
  })

  if (res.status === 200) {
    const data = await res.json()
    return data.categories || []
  }
  return []
}

export const getCategory = async (id) => {
  const res = await fetch(`${process.env.API_BASE}/categories/${id}`, {
    method: "GET",
    next: { tags: [`category-${id}`] },
  })

  if (res.status === 200) {
    const data = await res.json()
    return data
  }
  return null
}

export const createCategory = async (categoryData) => {
  const res = await fetch(`${process.env.API_BASE}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      jwt: cookies().get("jwt").value,
    },
    body: JSON.stringify(categoryData),
  })

  if (res.status === 200) {
    const data = await res.json()
    revalidateTag("categories")
    return { success: true, category: data }
  }
  return { success: false, message: "Failed to create category" }
}

export const updateCategory = async (id, categoryData) => {
  const res = await fetch(`${process.env.API_BASE}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      jwt: cookies().get("jwt").value,
    },
    body: JSON.stringify(categoryData),
  })

  if (res.status === 200) {
    const data = await res.json()
    revalidateTag(`category-${id}`)
    revalidateTag("categories")
    return { success: true, category: data }
  }
  return { success: false, message: "Failed to update category" }
}

// Admin Operations
export const getLMSUsers = async (role = "", search = "", page = 1, limit = 10) => {
  let url = `${process.env.API_BASE}/admin/users?page=${page}&limit=${limit}`
  if (role) url += `&role=${role}`
  if (search) url += `&search=${search}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      jwt: cookies().get("jwt").value,
    },
    next: { tags: ["lms-users"] },
  })

  if (res.status === 200) {
    const data = await res.json()
    return data
  }
  return { users: [], pagination: { total: 0, page: 1, limit: 10, pages: 0 } }
}

export const updateUserRole = async (id, role) => {
  const formData = new URLSearchParams()
  formData.append("role", role)

  const res = await fetch(`${process.env.API_BASE}/admin/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      jwt: cookies().get("jwt").value,
    },
    body: formData,
  })

  if (res.status === 200) {
    revalidateTag("lms-users")
    return { success: true }
  }
  return { success: false, message: "Failed to update user role" }
}

export const getAllCourses = async (status = "", category = "", search = "", page = 1, limit = 10) => {
  let url = `${process.env.API_BASE}/admin/courses?page=${page}&limit=${limit}`
  if (status) url += `&status=${status}`
  if (category) url += `&category=${category}`
  if (search) url += `&search=${search}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      jwt: cookies().get("jwt").value,
    },
    next: { tags: ["all-courses"] },
  })

  if (res.status === 200) {
    const data = await res.json()
    return data
  }
  return { courses: [], pagination: { total: 0, page: 1, limit: 10, pages: 0 } }
}

export const updateCourseStatus = async (id, status) => {
  const formData = new URLSearchParams()
  formData.append("status", status)

  const res = await fetch(`${process.env.API_BASE}/admin/courses/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      jwt: cookies().get("jwt").value,
    },
    body: formData,
  })

  if (res.status === 200) {
    revalidateTag("all-courses")
    revalidateTag("courses")
    revalidateTag(`course-${id}`)
    return { success: true }
  }
  return { success: false, message: "Failed to update course status" }
}

