export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  image: string
  learningOutcomes: string[]
  content: string
  videos: {
    title: string
    description: string
    url: string
    duration: string
  }[]
}

export const courses: Course[] = [
  {
    id: "web-development",
    title: "Web Development Fundamentals",
    description: "Learn the core concepts of HTML, CSS, and JavaScript to build modern websites from scratch.",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    level: "Beginner",
    image: "/assets/images/Web Development.jpg",
    learningOutcomes: [
      "Understand HTML structure and semantics",
      "Create responsive layouts with CSS",
      "Build interactive features with JavaScript",
      "Deploy websites to production",
    ],
    content:
      "This comprehensive course covers everything you need to know to start your journey as a web developer. We'll begin with HTML basics, move on to CSS styling and layouts, and finish with JavaScript programming. By the end of this course, you'll have built several real-world projects for your portfolio.",
    videos: [
      {
        title: "Introduction to Web Development",
        description: "An overview of what you'll learn in this course and how the web works.",
        url: "/videos/video1.mp4",
        duration: "15:30",
      },
      {
        title: "HTML Fundamentals",
        description: "Learn the basic structure of HTML documents and essential tags.",
        url: "/videos/video2.mp4",
        duration: "22:45",
      },
      {
        title: "CSS Styling Basics",
        description: "How to style your HTML elements with CSS selectors and properties.",
        url: "/videos/video3.mp4",
        duration: "18:20",
      },
      {
        title: "JavaScript Essentials",
        description: "Introduction to JavaScript syntax, variables, and functions.",
        url: "/videos/video4.mp4",
        duration: "25:15",
      },
    ],
  },
  {
    id: "react-masterclass",
    title: "React.js Masterclass",
    description:
      "Master React.js and build powerful single-page applications with the most popular JavaScript library.",
    instructor: "Michael Chen",
    duration: "10 weeks",
    level: "Intermediate",
    image: "/assets/images/React Masterclass.jpg",
    learningOutcomes: [
      "Understand React component architecture",
      "Manage state effectively with hooks",
      "Implement routing in single-page applications",
      "Connect to APIs and handle data fetching",
    ],
    content:
      "Take your JavaScript skills to the next level with React.js. This course dives deep into component-based architecture, state management, and modern React patterns. You'll learn how to build scalable applications using hooks, context API, and other advanced features. We'll also cover performance optimization and testing strategies.",
    videos: [
      {
        title: "React Fundamentals",
        description: "Introduction to React and its core concepts.",
        url: "/videos/video1.mp4",
        duration: "20:15",
      },
      {
        title: "Components and Props",
        description: "Learn how to create and compose React components.",
        url: "/videos/video2.mp4",
        duration: "23:40",
      },
      {
        title: "State and Lifecycle",
        description: "Managing component state and understanding the React lifecycle.",
        url: "/videos/video3.mp4",
        duration: "19:55",
      },
      {
        title: "Hooks in Depth",
        description: "Using React hooks for state management and side effects.",
        url: "/videos/video4.mp4",
        duration: "27:30",
      },
    ],
  },
  {
    id: "data-science-python",
    title: "Data Science with Python",
    description: "Learn how to analyze data, create visualizations, and build predictive models using Python.",
    instructor: "Dr. Emily Rodriguez",
    duration: "12 weeks",
    level: "Advanced",
    image: "/assets/images/Data Science Python.jpg",
    learningOutcomes: [
      "Master data manipulation with Pandas",
      "Create insightful visualizations with Matplotlib and Seaborn",
      "Build machine learning models with Scikit-learn",
      "Implement deep learning with TensorFlow",
    ],
    content:
      "This comprehensive data science course will teach you how to extract insights from complex datasets. You'll learn the entire data science pipeline from data collection and cleaning to analysis and visualization. The course includes hands-on projects analyzing real-world datasets and building predictive models that solve business problems.",
    videos: [
      {
        title: "Introduction to Data Science",
        description: "Overview of data science and the Python ecosystem for data analysis.",
        url: "/videos/video1.mp4",
        duration: "18:45",
      },
      {
        title: "Data Manipulation with Pandas",
        description: "Learn how to clean, transform, and analyze data with Pandas.",
        url: "/videos/video2.mp4",
        duration: "24:30",
      },
      {
        title: "Data Visualization Techniques",
        description: "Creating effective visualizations with Matplotlib and Seaborn.",
        url: "/videos/video3.mp4",
        duration: "21:15",
      },
      {
        title: "Machine Learning Fundamentals",
        description: "Introduction to machine learning algorithms and Scikit-learn.",
        url: "/videos/video4.mp4",
        duration: "29:50",
      },
    ],
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications for iOS and Android using React Native.",
    instructor: "James Wilson",
    duration: "9 weeks",
    level: "Intermediate",
    image: "/assets/images/Mobile App Development.jpg",
    learningOutcomes: [
      "Set up a React Native development environment",
      "Build UI components for mobile interfaces",
      "Implement navigation between screens",
      "Access native device features like camera and location",
    ],
    content:
      "Learn how to build native mobile apps for both iOS and Android using a single codebase with React Native. This course covers everything from setting up your development environment to publishing your app to the app stores. You'll build several complete applications including a social media app, a task manager, and a location-based service.",
    videos: [
      {
        title: "Getting Started with React Native",
        description: "Setting up your development environment and creating your first app.",
        url: "/videos/video1.mp4",
        duration: "22:10",
      },
      {
        title: "Building UI Components",
        description: "Creating reusable UI components for mobile interfaces.",
        url: "/videos/video2.mp4",
        duration: "19:45",
      },
      {
        title: "Navigation and Routing",
        description: "Implementing navigation between screens in React Native.",
        url: "/videos/video3.mp4",
        duration: "23:20",
      },
      {
        title: "Accessing Native Features",
        description: "Using device features like camera, location, and notifications.",
        url: "/videos/video4.mp4",
        duration: "26:15",
      },
    ],
  },
]
