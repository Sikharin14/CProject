import { mockQuizzes } from '../data/mockQuizzes';
import { mockQuestions } from '../data/mockQuestions';
import { mockUsers, mockAttempts } from '../data/mockUsers';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  // Quiz operations
  async getQuizzes() {
    await delay();
    return { data: mockQuizzes, status: 200 };
  },

  async getQuiz(id) {
    await delay();
    const quiz = mockQuizzes.find(q => q.id === parseInt(id));
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return { data: quiz, status: 200 };
  },

  async getQuizQuestions(quizId) {
    await delay();
    const questions = mockQuestions.filter(q => q.quizId === parseInt(quizId));
    return { data: questions, status: 200 };
  },

  // User operations
  async getUser(id) {
    await delay();
    const user = mockUsers.find(u => u.id === parseInt(id));
    if (!user) {
      throw new Error('User not found');
    }
    return { data: user, status: 200 };
  },

  async login(credentials) {
    await delay();
    // Mock authentication - accept any email/password
    const user = mockUsers.find(u => u.email === credentials.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return { 
      data: { 
        user, 
        token: 'mock-jwt-token-' + Date.now() 
      }, 
      status: 200 
    };
  },

  async register(userData) {
    await delay();
    // Mock registration
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      joinedAt: new Date().toISOString(),
      totalQuizzes: 0,
      averageScore: 0
    };
    return { 
      data: { 
        user: newUser, 
        token: 'mock-jwt-token-' + Date.now() 
      }, 
      status: 201 
    };
  },

  // Quiz attempt operations
  async submitQuizAttempt(quizId, answers) {
    await delay();
    const quiz = mockQuizzes.find(q => q.id === parseInt(quizId));
    const questions = mockQuestions.filter(q => q.quizId === parseInt(quizId));
    
    if (!quiz || !questions.length) {
      throw new Error('Quiz not found');
    }

    // Calculate score
    let correctAnswers = 0;
    const detailedAnswers = answers.map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      const correct = question && question.correctAnswer === answer.selectedAnswer;
      if (correct) correctAnswers++;
      
      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        correct,
        correctAnswer: question?.correctAnswer,
        explanation: question?.explanation
      };
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    
    const attempt = {
      id: mockAttempts.length + 1,
      userId: 1, // Mock current user
      quizId: parseInt(quizId),
      score,
      totalQuestions: questions.length,
      correctAnswers,
      timeSpent: Math.floor(Math.random() * 1800) + 300, // Random time between 5-35 minutes
      completedAt: new Date().toISOString(),
      answers: detailedAnswers
    };

    return { data: attempt, status: 201 };
  },

  async getUserAttempts(userId) {
    await delay();
    const attempts = mockAttempts.filter(a => a.userId === parseInt(userId));
    // Add quiz details to attempts
    const attemptsWithQuizDetails = attempts.map(attempt => ({
      ...attempt,
      quiz: mockQuizzes.find(q => q.id === attempt.quizId)
    }));
    return { data: attemptsWithQuizDetails, status: 200 };
  },

  // Search and filter operations
  async searchQuizzes(query, filters = {}) {
    await delay();
    let filteredQuizzes = [...mockQuizzes];

    // Apply text search
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.title.toLowerCase().includes(searchTerm) ||
        quiz.description.toLowerCase().includes(searchTerm) ||
        quiz.category.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Apply difficulty filter
    if (filters.difficulty && filters.difficulty !== 'all') {
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
      );
    }

    return { data: filteredQuizzes, status: 200 };
  }
};