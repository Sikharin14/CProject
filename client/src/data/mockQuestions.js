export const mockQuestions = [
  // JavaScript Fundamentals Quiz (Quiz ID: 1)
  {
    id: 1,
    quizId: 1,
    question: "What is the correct way to declare a variable in JavaScript?",
    type: "multiple-choice",
    options: [
      "var myVar;",
      "variable myVar;",
      "v myVar;",
      "declare myVar;"
    ],
    correctAnswer: 0,
    explanation: "The 'var' keyword is used to declare variables in JavaScript."
  },
  {
    id: 2,
    quizId: 1,
    question: "Which of the following is NOT a primitive data type in JavaScript?",
    type: "multiple-choice",
    options: [
      "string",
      "number",
      "object",
      "boolean"
    ],
    correctAnswer: 2,
    explanation: "Object is not a primitive data type. The primitive types are string, number, boolean, null, undefined, symbol, and bigint."
  },
  {
    id: 3,
    quizId: 1,
    question: "JavaScript is a compiled language.",
    type: "true-false",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "JavaScript is an interpreted language, not compiled."
  },
  {
    id: 4,
    quizId: 1,
    question: "What does '===' operator do in JavaScript?",
    type: "multiple-choice",
    options: [
      "Checks for equality without type conversion",
      "Checks for equality with type conversion",
      "Assigns a value",
      "Compares references"
    ],
    correctAnswer: 0,
    explanation: "The '===' operator checks for strict equality without type conversion."
  },
  {
    id: 5,
    quizId: 1,
    question: "Which method is used to add an element to the end of an array?",
    type: "multiple-choice",
    options: [
      "append()",
      "push()",
      "add()",
      "insert()"
    ],
    correctAnswer: 1,
    explanation: "The push() method adds one or more elements to the end of an array."
  },

  // React.js Essentials Quiz (Quiz ID: 2)
  {
    id: 6,
    quizId: 2,
    question: "What is JSX in React?",
    type: "multiple-choice",
    options: [
      "A JavaScript library",
      "A syntax extension for JavaScript",
      "A CSS framework",
      "A database query language"
    ],
    correctAnswer: 1,
    explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React components."
  },
  {
    id: 7,
    quizId: 2,
    question: "React components must always return a single parent element.",
    type: "true-false",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "With React Fragments, components can return multiple elements without a single parent wrapper."
  },
  {
    id: 8,
    quizId: 2,
    question: "Which hook is used to manage state in functional components?",
    type: "multiple-choice",
    options: [
      "useEffect",
      "useState",
      "useContext",
      "useReducer"
    ],
    correctAnswer: 1,
    explanation: "useState is the hook used to add state to functional components."
  },

  // Web Development Basics Quiz (Quiz ID: 3)
  {
    id: 9,
    quizId: 3,
    question: "What does HTML stand for?",
    type: "multiple-choice",
    options: [
      "Hypertext Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language"
    ],
    correctAnswer: 0,
    explanation: "HTML stands for Hypertext Markup Language."
  },
  {
    id: 10,
    quizId: 3,
    question: "CSS stands for Cascading Style Sheets.",
    type: "true-false",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "Yes, CSS stands for Cascading Style Sheets."
  }
];