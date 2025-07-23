# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack quiz application with the following architecture:
- **Frontend**: React.js (planned to run on http://localhost:3000)
- **Backend**: Node.js with Express.js (planned to run on http://localhost:5000)
- **Database**: SQLite

## Development Commands

### Backend Development (server/ directory)
```bash
# Install dependencies
npm install

# Initialize database
npm run init-db

# Start development server
npm run dev

# Run tests
npm test

# Seed database with sample data
npm run seed
```

### Frontend Development (client/ directory)
```bash
# Install dependencies  
npm install

# Start React development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

The project follows a typical full-stack structure:

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Quiz/       # Quiz-taking components
│   │   │   ├── Question/   # Question rendering components
│   │   │   ├── Score/      # Score display components
│   │   │   └── History/    # Quiz history components
│   │   ├── pages/          # Route-level components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # CSS/styling files
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route handlers and business logic
│   ├── models/           # Database models and schemas
│   ├── routes/           # API route definitions
│   ├── middleware/       # Express middleware
│   ├── database/         # SQLite database file location
│   ├── scripts/          # Database initialization and seeding
│   └── server.js         # Main server entry point
└── package.json          # Root package.json for project scripts
```

## Database Schema

The application uses SQLite with the following main tables:
- **users**: User accounts with authentication
- **quizzes**: Quiz metadata (title, description, category, difficulty)
- **questions**: Individual questions linked to quizzes (supports multiple choice and true/false)
- **quiz_attempts**: User quiz attempt records with scores and timing

## Key API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get specific quiz
- `POST /api/quizzes` - Create new quiz
- `PUT /api/quizzes/:id` - Update quiz
- `DELETE /api/quizzes/:id` - Delete quiz

### Questions & Attempts
- `GET /api/quizzes/:id/questions` - Get quiz questions
- `POST /api/quizzes/:id/attempt` - Submit quiz attempt
- `GET /api/users/:id/attempts` - Get user's quiz history

## Environment Configuration

The server requires a `.env` file with:
- `PORT=5000` - Server port
- `DB_PATH=./database/quiz.db` - SQLite database path
- `JWT_SECRET` - JWT signing secret
- `CLIENT_URL=http://localhost:3000` - Frontend URL for CORS

## Development Dependencies

### Backend Stack
- **express**: Web framework
- **sqlite3**: Database driver
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **helmet**: Security middleware
- **nodemon**: Development auto-restart (dev dependency)
- **jest**: Testing framework (dev dependency)

### Frontend Stack
- **react**: UI library
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **react-query**: Data fetching and caching
- **styled-components**: CSS-in-JS styling

## Testing Strategy

- Backend: Use Jest with Supertest for API endpoint testing
- Frontend: Use React Testing Library for component testing
- Database: Test with separate test database to avoid data conflicts

## Key Components to Implement

### Frontend Components
- **QuizList**: Display and filter available quizzes
- **QuizTaker**: Handle quiz taking flow with timer and progress tracking
- **QuizCreator**: Admin interface for creating/editing quizzes
- **ScoreBoard**: Display results and analytics
- **History**: User's personal quiz history and statistics

### Backend Controllers
- **AuthController**: Handle user registration, login, and JWT management
- **QuizController**: CRUD operations for quizzes with filtering and search
- **QuestionController**: Question management and answer validation logic

## Security Considerations

- Use bcryptjs for password hashing
- Implement JWT-based authentication
- Use helmet middleware for security headers
- Validate all user inputs with express-validator
- Implement proper CORS configuration