# Quiz Application

A full-stack web application for creating and taking quizzes with multiple question types, scoring, and progress tracking.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: SQLite
- **Styling**: CSS3 (or your preferred CSS framework)

## Features

### Core Features

- Create custom quizzes with multiple question types
- Multiple choice questions
- True/false questions
- Real-time score tracking
- Quiz history and progress tracking
- User management system
- Quiz categories and difficulty levels

### Additional Features

- Timer functionality for quizzes
- Leaderboards
- Responsive design for mobile devices
- Search and filter quizzes
- Save and resume quiz progress

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Project Structure

```
quiz-application/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Quiz/
│   │   │   ├── Question/
│   │   │   ├── Score/
│   │   │   └── History/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── styles/
│   ├── package.json
│   └── README.md
├── server/                 # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── database/
│   │   └── quiz.db
│   ├── package.json
│   └── server.js
├── README.md
└── package.json
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/quiz-application.git
cd quiz-application
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Initialize the database
npm run init-db

# Start the development server
npm run dev
```

### 3. Frontend Setup

```bash
# Open new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Start the React development server
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Backend Dependencies

```json
{
  "express": "^4.18.2",
  "sqlite3": "^5.1.6",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "express-validator": "^6.15.0",
  "helmet": "^6.1.5",
  "morgan": "^1.10.0"
}
```

### Backend Dev Dependencies

```json
{
  "nodemon": "^2.0.22",
  "jest": "^29.5.0",
  "supertest": "^6.3.3"
}
```

## Frontend Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.11.1",
  "axios": "^1.4.0",
  "react-query": "^3.39.3",
  "styled-components": "^5.3.10"
}
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Quizzes Table

```sql
CREATE TABLE quizzes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  difficulty VARCHAR(20) DEFAULT 'medium',
  creator_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(id)
);
```

### Questions Table

```sql
CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quiz_id INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_type VARCHAR(20) NOT NULL, -- 'multiple_choice' or 'true_false'
  correct_answer TEXT NOT NULL,
  options TEXT, -- JSON string for multiple choice options
  points INTEGER DEFAULT 1,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);
```

### Quiz Attempts Table

```sql
CREATE TABLE quiz_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  quiz_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken INTEGER, -- in seconds
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);
```

## API Endpoints

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

### Questions

- `GET /api/quizzes/:id/questions` - Get quiz questions
- `POST /api/quizzes/:id/questions` - Add question to quiz
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Quiz Attempts

- `POST /api/quizzes/:id/attempt` - Submit quiz attempt
- `GET /api/users/:id/attempts` - Get user's quiz history
- `GET /api/quizzes/:id/leaderboard` - Get quiz leaderboard

## Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DB_PATH=./database/quiz.db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

## Development Scripts

### Backend Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "init-db": "node scripts/initDatabase.js",
  "test": "jest",
  "seed": "node scripts/seedDatabase.js"
}
```

### Frontend Scripts

```json
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

## Key Components

### Frontend Components

#### QuizList Component

- Display available quizzes
- Filter by category/difficulty
- Search functionality

#### QuizTaker Component

- Render quiz questions
- Handle user answers
- Track progress and time
- Submit quiz results

#### QuizCreator Component

- Form for creating new quizzes
- Add/edit questions
- Set quiz metadata

#### ScoreBoard Component

- Display quiz results
- Show correct/incorrect answers
- Performance analytics

#### History Component

- User's quiz attempt history
- Performance trends
- Personal statistics

### Backend Controllers

#### AuthController

- User registration and login
- JWT token management
- Password hashing

#### QuizController

- CRUD operations for quizzes
- Quiz filtering and search
- Quiz statistics

#### QuestionController

- Question management
- Answer validation
- Scoring logic

## Testing

### Backend Testing

```bash
cd server
npm test
```

### Frontend Testing

```bash
cd client
npm test
```

## Deployment

### Production Build

1. **Build Frontend**:

```bash
cd client
npm run build
```

2. **Set Production Environment**:

```bash
cd server
NODE_ENV=production npm start
```

### Deploy to Heroku

1. Create Procfile:

```
web: cd server && npm start
```

2. Configure build scripts in root package.json:

```json
{
  "scripts": {
    "heroku-postbuild": "cd client && npm install && npm run build"
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/yourusername/quiz-application/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the maintainers

## Roadmap

- [ ] Add drag-and-drop question ordering
- [ ] Implement quiz templates
- [ ] Add multimedia support (images, videos)
- [ ] Real-time multiplayer quizzes
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with learning management systems

---
