import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import QuestionCard from '../Question/QuestionCard';
import QuestionTimer from '../Question/QuestionTimer';
import { mockApi } from '../../utils/mockApi';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const QuizHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const QuizInfo = styled.div`
  h1 {
    font-size: ${props => props.theme.typography.fontSize['2xl']};
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.sm};

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.typography.fontSize.xl};
    }
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
  }
`;

const ProgressSection = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};

  span {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.theme.colors.gray200};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: ${props => props.theme.borderRadius.full};
  transition: width ${props => props.theme.transitions.normal};
  width: ${props => props.percentage}%;
`;

const NavigationSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all ${props => props.theme.transitions.fast};
  min-width: 120px;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavButton)`
  background-color: ${props => props.theme.colors.gray200};
  color: ${props => props.theme.colors.textPrimary};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.gray300};
  }
`;

const NextButton = styled(NavButton)`
  background-color: ${props => props.theme.colors.primary};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const FinishButton = styled(NavButton)`
  background-color: ${props => props.theme.colors.success};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.success}dd;
  }
`;

const QuestionNavigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const QuestionNumber = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  transition: all ${props => props.theme.transitions.fast};
  
  ${props => props.isCurrent ? `
    background-color: ${props.theme.colors.primary};
    color: white;
  ` : props.isAnswered ? `
    background-color: ${props.theme.colors.success}20;
    color: ${props.theme.colors.success};
    border: 1px solid ${props.theme.colors.success};
  ` : `
    background-color: ${props.theme.colors.gray100};
    color: ${props.theme.colors.textSecondary};
    border: 1px solid ${props.theme.colors.gray200};
  `}

  &:hover {
    transform: scale(1.1);
  }
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing['4xl']};
  color: ${props => props.theme.colors.textSecondary};
  
  .loading {
    margin-right: ${props => props.theme.spacing.md};
  }
`;

const QuizTaker = ({ quizId, onComplete }) => {
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  const loadQuizData = useCallback(async () => {
    try {
      setLoading(true);
      const [quizResponse, questionsResponse] = await Promise.all([
        mockApi.getQuiz(quizId),
        mockApi.getQuizQuestions(quizId)
      ]);
      
      setQuiz(quizResponse.data);
      setQuestions(questionsResponse.data);
      setTimeLeft(quizResponse.data.timeLimit);
    } catch (error) {
      console.error('Error loading quiz:', error);
      navigate('/quizzes');
    } finally {
      setLoading(false);
    }
  }, [quizId, navigate]);

  useEffect(() => {
    loadQuizData();
  }, [loadQuizData]);

  const handleAnswerSelect = (answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleQuestionJump = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
  };

  const handleFinishQuiz = async () => {
    
    // Prepare answers for submission
    const submissionAnswers = questions.map((question, index) => ({
      questionId: question.id,
      selectedAnswer: answers[index] !== undefined ? answers[index] : null
    }));

    try {
      const result = await mockApi.submitQuizAttempt(quizId, submissionAnswers);
      navigate('/results', { 
        state: { 
          result: result.data, 
          quiz, 
          questions, 
          userAnswers: answers 
        } 
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const handleTimeUp = () => {
    handleFinishQuiz();
  };

  const getProgressPercentage = () => {
    return questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  if (loading) {
    return (
      <LoadingState>
        <div className="loading"></div>
        <span>Loading quiz...</span>
      </LoadingState>
    );
  }

  if (!quiz || !questions.length) {
    return (
      <QuizContainer>
        <div>Quiz not found or has no questions.</div>
      </QuizContainer>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <QuizContainer>
      <QuizHeader>
        <QuizInfo>
          <h1>{quiz.title}</h1>
          <p>{quiz.description}</p>
        </QuizInfo>
        
        <QuestionTimer
          totalTime={timeLeft}
          onTimeUp={handleTimeUp}
          isActive={true}
        />
      </QuizHeader>

      <ProgressSection>
        <ProgressHeader>
          <span>Progress: {currentQuestionIndex + 1} of {questions.length}</span>
          <span>Answered: {getAnsweredCount()} of {questions.length}</span>
        </ProgressHeader>
        <ProgressBar>
          <ProgressFill percentage={getProgressPercentage()} />
        </ProgressBar>
      </ProgressSection>

      <QuestionNavigation>
        {questions.map((_, index) => (
          <QuestionNumber
            key={index}
            isCurrent={index === currentQuestionIndex}
            isAnswered={answers[index] !== undefined}
            onClick={() => handleQuestionJump(index)}
          >
            {index + 1}
          </QuestionNumber>
        ))}
      </QuestionNavigation>

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={answers[currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
      />

      <NavigationSection>
        <PrevButton
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          ← Previous
        </PrevButton>

        <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        {currentQuestionIndex === questions.length - 1 ? (
          <FinishButton onClick={handleFinishQuiz}>
            Finish Quiz ✓
          </FinishButton>
        ) : (
          <NextButton onClick={handleNext}>
            Next →
          </NextButton>
        )}
      </NavigationSection>
    </QuizContainer>
  );
};

export default QuizTaker;