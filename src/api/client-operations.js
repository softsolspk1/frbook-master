// src/api/client-operations.js
// No server-only imports here!

// Helper function to get JWT from cookies on the client side
function getJwtFromCookie() {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'jwt') {
        return value;
      } 
    }
  }
  return null;
}

// LMS Stats API
export const getLMSStats = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/lms/stats`, {
    method: "GET",
    headers: {
      jwt: getJwtFromCookie(),
    },
  });
  if (res.status === 200) {
    var data = await res.json();
    return data;
  }
  return {
    totalCourses: 0,
    totalStudents: 0,
    totalEnrollments: 0,
    completionRate: 0,
    courseGrowth: "+0% from last month",
    studentGrowth: "+0% from last month",
    enrollmentGrowth: "+0% from last month",
    completionGrowth: "+0% from last month",
  };
};

// Courses API
export const getCourses = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses`, {
    method: "GET",
    headers: {
      jwt: getJwtFromCookie(),
    },
  });
  if (res.status === 200) {
    var data = await res.json();
    return data;
  }
  return [];
};

export const getCourseById = async (id) => {
  if (!id) {
    console.error("Course ID is missing!");
    return null;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses/${id}`, {
    method: "GET",
    headers: {
      jwt: getJwtFromCookie(),
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
};

export const createCourse = async (courseData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses`, {
    method: "POST",
    body: JSON.stringify(courseData),
    headers: {
      "Content-Type": "application/json",
      jwt: getJwtFromCookie(),
    },
  });

  if (res.status !== 200 && res.status !== 201) {
    return { success: false, message: "Server error" };
  }

  var data = await res.json();
  return { success: true, data };
};

export const updateCourse = async (courseData) => {
  const id = courseData.id;
  if (!id) {
    return { success: false, message: "Course ID is required" };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(courseData),
    headers: {
      "Content-Type": "application/json",
      jwt: getJwtFromCookie(),
    },
  });

  if (res.status !== 200) {
    return { success: false, message: "Server error" };
  }

  var data = await res.json();
  return { success: true, data };
};

export const deleteCourse = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses/${id}`, {
    method: "DELETE",
    headers: {
      jwt: getJwtFromCookie(),
    },
  });

  if (res.status !== 200 && res.status !== 204) {
    return { success: false, message: "Server error" };
  }

  return { success: true };
};

// Modules API
export const getModulesForCourse = async (courseId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses/${courseId}/modules`, {
    method: "GET",
    headers: {
      jwt: getJwtFromCookie(),
    },
  });
  if (res.status === 200) {
    var data = await res.json();
    return data;
  }
  return [];
};

export const getModule = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/modules/${id}`, {
    method: "GET",
    headers: {
      jwt: getJwtFromCookie(),
    },
  });
  if (res.status === 200) {
    var data = await res.json();
    return data;
  }
  return null;
};

export const createModule = async (moduleData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/modules`, {
    method: "POST",
    body: JSON.stringify(moduleData),
    headers: {
      "Content-Type": "application/json",
      jwt: getJwtFromCookie(),
    },
  });

  if (res.status !== 200 && res.status !== 201) {
    return { success: false, message: "Server error" };
  }

  var data = await res.json();
  return { success: true, data };
};

export const updateModule = async (id, moduleData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/modules/${id}`, {
    method: "PUT",
    body: JSON.stringify(moduleData),
    headers: {
      "Content-Type": "application/json",
      jwt: getJwtFromCookie(),
    },
  });

  if (res.status !== 200) {
    return { success: false, message: "Server error" };
  }

  var data = await res.json();
  return { success: true, data };
};

export const deleteModule = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/modules/${id}`, {
    method: "DELETE",
    headers: {
      jwt: getJwtFromCookie(),
    },
  });

  if (res.status !== 200 && res.status !== 204) {
    return { success: false, message: "Server error" };
  }

  return { success: true };
};

// Lessons API
export const getLessonsForModule = async (moduleId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/modules/${moduleId}/lessons`, {
    method: "GET",
    headers: {
      jwt: getJwtFromCookie(),
    },
  });
  if (res.status === 200) {
    var data = await res.json();
    return data;
  }
  return [];
};

export const getLesson = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/lessons/${id}`, {
    method: "GET",
    headers: {
      jwt: getJwtFromCookie(),
    },
  });
  if (res.status === 200) {
    var data = await res.json();
    return data;
  }
  return null;
};

export const createLesson = async (lessonData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/lessons`, {
    method: "POST",
    body: JSON.stringify(lessonData),
    headers: {
      "Content-Type": "application/json",
      jwt: getJwtFromCookie(),
    },
  });

  if (res.status !== 200 && res.status !== 201) {
    return { success: false, message: "Server error" };
  }

  var data = await res.json();
  return { success: true, data };
};

export const updateLesson = async (id, lessonData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/lessons/${id}`, {
    method: "PUT",
    body: JSON.stringify(lessonData),
    headers: {
      "Content-Type": "application/json",
      jwt: getJwtFromCookie(),
    },
  });

  if (res.status !== 200) {
    return { success: false, message: "Server error" };
  }

  var data = await res.json();
  return { success: true, data };
};

export const deleteLesson = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/lessons/${id}`, {
    method: "DELETE",
    headers: {
      jwt: getJwtFromCookie(),
    },
  });

  if (res.status !== 200 && res.status !== 204) {
    return { success: false, message: "Server error" };
  }

  return { success: true };
};

export const me = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/me`, {
    method: 'GET',
    headers: {
      jwt: getJwtFromCookie(),
    },
  });
  if (res.status === 200) {
    var data = await res.json();
    return data.result;
  }
  return null;
};

export const uploadFile = async (file, type = 'image') => {
  if (!file) {
    return { success: false, message: "No file provided" };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "jwt": getJwtFromCookie(),
      },
    });

    if (res.status !== 200 && res.status !== 201) {
      return { success: false, message: "Server error" };
    }

    const data = await res.json();
    return { success: true, url: data.url || data.file_url || data };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, message: "Error uploading file" };
  }
};