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
  }
  
  export const courses: Course[] = [
    {
      id: "web-development",
      title: "Web Development Fundamentals",
      description: "Learn the core concepts of HTML, CSS, and JavaScript to build modern websites from scratch.",
      instructor: "Sarah Johnson",
      duration: "8 weeks",
      level: "Beginner",
      image: "/assets/images/WebDevelopment.jpg",
      learningOutcomes: [
        "Understand HTML structure and semantics",
        "Create responsive layouts with CSS",
        "Build interactive features with JavaScript",
        "Deploy websites to production",
      ],
      content:
        "This comprehensive course covers everything you need to know to start your journey as a web developer. We'll begin with HTML basics, move on to CSS styling and layouts, and finish with JavaScript programming. By the end of this course, you'll have built several real-world projects for your portfolio.",
    },
    {
      id: "react-masterclass",
      title: "React.js Masterclass",
      description:
        "Master React.js and build powerful single-page applications with the most popular JavaScript library.",
      instructor: "Michael Chen",
      duration: "10 weeks",
      level: "Intermediate",
      image: "/assets/images/reactjs.jpeg",
      learningOutcomes: [
        "Understand React component architecture",
        "Manage state effectively with hooks",
        "Implement routing in single-page applications",
        "Connect to APIs and handle data fetching",
      ],
      content:
        "Take your JavaScript skills to the next level with React.js. This course dives deep into component-based architecture, state management, and modern React patterns. You'll learn how to build scalable applications using hooks, context API, and other advanced features. We'll also cover performance optimization and testing strategies.",
    },
    {
      id: "data-science-python",
      title: "Data Science with Python",
      description: "Learn how to analyze data, create visualizations, and build predictive models using Python.",
      instructor: "Dr. Emily Rodriguez",
      duration: "12 weeks",
      level: "Advanced",
      image: "/assets/images/Python-for-Data-Science-illustration.jpg",
      learningOutcomes: [
        "Master data manipulation with Pandas",
        "Create insightful visualizations with Matplotlib and Seaborn",
        "Build machine learning models with Scikit-learn",
        "Implement deep learning with TensorFlow",
      ],
      content:
        "This comprehensive data science course will teach you how to extract insights from complex datasets. You'll learn the entire data science pipeline from data collection and cleaning to analysis and visualization. The course includes hands-on projects analyzing real-world datasets and building predictive models that solve business problems.",
    },
    {
      id: "mobile-app-development",
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile applications for iOS and Android using React Native.",
      instructor: "James Wilson",
      duration: "9 weeks",
      level: "Intermediate",
      image: "/assets/images/OIP.jpeg",
      learningOutcomes: [
        "Set up a React Native development environment",
        "Build UI components for mobile interfaces",
        "Implement navigation between screens",
        "Access native device features like camera and location",
      ],
      content:
        "Learn how to build native mobile apps for both iOS and Android using a single codebase with React Native. This course covers everything from setting up your development environment to publishing your app to the app stores. You'll build several complete applications including a social media app, a task manager, and a location-based service.",
    },
  ]
  
  