export const mockUsers = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    avatar: "/images/avatar1.jpg",
    joinedAt: "2024-01-10T08:00:00Z",
    totalQuizzes: 15,
    averageScore: 78
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Smith",
    avatar: "/images/avatar2.jpg",
    joinedAt: "2024-01-15T10:30:00Z",
    totalQuizzes: 8,
    averageScore: 85
  }
];

export const mockAttempts = [
  {
    id: 1,
    userId: 1,
    quizId: 1,
    score: 80,
    totalQuestions: 10,
    correctAnswers: 8,
    timeSpent: 1200, // 20 minutes
    completedAt: "2024-01-20T14:30:00Z",
    answers: [
      { questionId: 1, selectedAnswer: 0, correct: true },
      { questionId: 2, selectedAnswer: 2, correct: true },
      { questionId: 3, selectedAnswer: 1, correct: true },
      { questionId: 4, selectedAnswer: 0, correct: true },
      { questionId: 5, selectedAnswer: 1, correct: true },
    ]
  },
  {
    id: 2,
    userId: 1,
    quizId: 2,
    score: 75,
    totalQuestions: 15,
    correctAnswers: 11,
    timeSpent: 1800, // 30 minutes
    completedAt: "2024-01-22T16:45:00Z",
    answers: [
      { questionId: 6, selectedAnswer: 1, correct: true },
      { questionId: 7, selectedAnswer: 0, correct: false },
      { questionId: 8, selectedAnswer: 1, correct: true },
    ]
  },
  {
    id: 3,
    userId: 2,
    quizId: 1,
    score: 90,
    totalQuestions: 10,
    correctAnswers: 9,
    timeSpent: 900, // 15 minutes
    completedAt: "2024-01-21T11:20:00Z",
    answers: [
      { questionId: 1, selectedAnswer: 0, correct: true },
      { questionId: 2, selectedAnswer: 2, correct: true },
      { questionId: 3, selectedAnswer: 1, correct: true },
      { questionId: 4, selectedAnswer: 0, correct: true },
      { questionId: 5, selectedAnswer: 1, correct: true },
    ]
  }
];