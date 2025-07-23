// Time formatting utilities
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

// Date formatting utilities
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Score utilities
export const getScoreColor = (score) => {
  if (score >= 90) return '#4CAF50'; // Green
  if (score >= 70) return '#FF9800'; // Orange
  if (score >= 50) return '#FFC107'; // Yellow
  return '#F44336'; // Red
};

export const getScoreGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

// Difficulty utilities
export const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return '#4CAF50';
    case 'intermediate':
      return '#FF9800';
    case 'advanced':
      return '#F44336';
    default:
      return '#757575';
  }
};

// Array utilities
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Local storage utilities
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// URL utilities
export const generateShareUrl = (quizId, score) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/quiz/${quizId}?shared=true&score=${score}`;
};

// Statistics utilities
export const calculateAverageScore = (attempts) => {
  if (!attempts || attempts.length === 0) return 0;
  const total = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
  return Math.round(total / attempts.length);
};

export const calculateTotalTime = (attempts) => {
  if (!attempts || attempts.length === 0) return 0;
  return attempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0);
};