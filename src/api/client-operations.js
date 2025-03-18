// client-operations.js - FOR CLIENT COMPONENTS
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}api/lms/stats`, {
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
  
  // Copy all the LMS functions from operations.js
  // But replace cookies().get("jwt") with getJwtFromCookie()
  // And use process.env.NEXT_PUBLIC_API_URL instead of process.env.API_BASE
  
  
  // Courses API
  export const getCourses = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses`, {
      method: "GET",
      headers: {
        jwt: getJwtFromCookie(),
    },
    })
    if (res.status === 200) {
      var data = await res.json()
      return data
    }
    return null
  } 
  

//   export const getCourseById = async (id) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses/${id}`, {
//         method: "GET",
//         headers: {
//             jwt: getJwtFromCookie(),
//         },
//     });
//     if (res.status === 200) {
//         return await res.json();
//     }
//     return null;
// };
export const getCourseById = async (id) => {
    console.log("Fetching course with ID:", id); // Debug log
    if (!id) {
        console.error("❌ Course ID is missing!");
        return null;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses/${id}`, {
        method: "GET",
        headers: {
            jwt: getJwtFromCookie(),
        },
    });

    console.log("API Response Status:", res.status); // Debug log

    if (res.status === 200) {
        const data = await res.json();
        console.log("✅ Course Data Received:", data);
        return data;
    } else {
        console.error("❌ Failed to fetch course:", await res.text());
    }

    return null;
};

  
  
  export const createCourse = async (courseData) => {
    console.log("Creating course:", courseData); // Add this for debugging
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses`, {
      method: "POST",
      body: JSON.stringify(courseData),
      headers: {
        "Content-Type": "application/json",
        "jwt": getJwtFromCookie(),
      },
    //   cache: "no-cache",
    });

    console.log("Response status:", res.status); // Add this for debugging
  
    if (res.status !== 200 && res.status !== 201) {
      return { success: false, message: "Server error" }
    }
  
    var data = await res.json()
    return { success: true, data }
  }
  
  export const updateCourse = async (id, courseData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(courseData),
      headers: {
        jwt: getJwtFromCookie(),
      },
      cache: "no-cache",
    })
  
    if (res.status !== 200) {
      return { success: false, message: "Server error" }
    }
  
    var data = await res.json()
    return { success: true, data }
  }
  
  export const deleteCourse = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses/${id}`, {
      method: "DELETE",
      headers: {
        jwt: getJwtFromCookie(),
      },
      cache: "no-cache",
    })
  
    if (res.status !== 200 && res.status !== 204) {
      return { success: false, message: "Server error" }
    }
  
    return { success: true }
  }
  
  // Modules API
  export const getModulesForCourse = async (courseId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/courses/${courseId}/modules`, {
      method: "GET",
      headers: {
        jwt: getJwtFromCookie(),
      },
    })
    if (res.status === 200) {
      var data = await res.json()
      return data
    }
    return null
  }
  
  export const getModule = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/modules/${id}`, {
      method: "GET",
      headers: {
        jwt: getJwtFromCookie(),
      },
    })
    if (res.status === 200) {
      var data = await res.json()
      return data
    }
    return null
  }
  
  export const createModule = async (moduleData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/modules`, {
      method: "POST",
      body: JSON.stringify(moduleData),
      headers: {
        jwt: getJwtFromCookie(),
      },
      cache: "no-cache",
    })
  
    if (res.status !== 200 && res.status !== 201) {
      return { success: false, message: "Server error" }
    }
  
    var data = await res.json()
    return { success: true, data }
  }
  
  export const updateModule = async (id, moduleData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/modules/${id}`, {
      method: "PUT",
      body: JSON.stringify(moduleData),
      headers: {
        jwt: getJwtFromCookie(),
      },
      cache: "no-cache",
    })
  
    if (res.status !== 200) {
      return { success: false, message: "Server error" }
    }
  
    var data = await res.json()
    return { success: true, data }
  }
  
  export const deleteModule = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/modules/${id}`, {
      method: "DELETE",
      headers: {
        jwt: getJwtFromCookie(),
      },
      cache: "no-cache",
    })
  
    if (res.status !== 200 && res.status !== 204) {
      return { success: false, message: "Server error" }
    }
  
    return { success: true }
  }
  
  // Lessons API
  export const getLessonsForModule = async (moduleId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/modules/${moduleId}/lessons`, {
      method: "GET",
      headers: {
        jwt: getJwtFromCookie(),
      },
    })
    if (res.status === 200) {
      var data = await res.json()
      return data
    }
    return null
  }
//   export const login = async (email, password) => {
//     console.log(process.env.API_BASE);
//     const res = await fetch(process.env.API_BASE + '/login', {
//         method: 'POST',
//         body: new URLSearchParams({
//             email, password
//         }),
//         headers: {
//             jwt: getJwtFromCookie(),
//           },
//         cache: "no-cache",
//     });
//     if (res.status === 200) {
//         cookies().set("jwt", res.headers.get("jwt"));
//         return { success: true };
//     } else if (res.status === 404) {
//         return { success: false, message: "User not found" };
//     } else if (res.status === 401) {
//         return { success: false, message: "Invalid password" };
//     }
//     return { success: false, message: "Server error" };
// }

export const me = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/me', {
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
}