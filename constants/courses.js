// constants/courses.js

export const COURSES = [
  {
    id: "c1",
    title: "NATURA SCIENCE 1 SEMESTER",
    price: "500 ETB",
    amount: 500,
    duration: "12 weeks",
    level: "Beginner → Advanced",
    lessons: [
      "HTML & CSS Fundamentals",
      "JavaScript & DOM",
      "React & State Management",
      "Node.js & Express API",
      "Database & Authentication",
      "Deployment & Portfolio Project",
    ],
  },
  {
    id: "c2",
    title: "NATURA SCIENCE 2 SEMESTER ",
    price: "500 ETB",
    amount: 500,
    duration: "10 weeks",
    level: "Intermediate",
    lessons: [
      "Expo & Project Setup",
      "Core Components & Styling",
      "Navigation (Expo Router)",
      "API Fetch & AsyncStorage",
      "State Management",
      "Play Store Build",
    ],
  },
  {
    id: "c2",
    title: "SOCIAL SCIENCE 1 SEMESTER ",
    price: "500 ETB",
    amount: 500,
    duration: "10 weeks",
    level: "Intermediate",
    lessons: [
      "Expo & Project Setup",
      "Core Components & Styling",
      "Navigation (Expo Router)",
      "API Fetch & AsyncStorage",
      "State Management",
      "Play Store Build",
    ],
  },
  {
    id: "c3",
    title: "SOCIAL SCIENCE 2 SEMESTER",
    price: "500 ETB",
    amount: 500,
    duration: "8 weeks",
    level: "Beginner",
    lessons: [
      "Design Thinking",
      "Color & Typography",
      "Figma Basics",
      "Wireframe & Prototype",
      "Design System",
      "User Testing",
    ],
  },
];

export const getCourseById = (id) => COURSES.find((c) => c.id === id);
