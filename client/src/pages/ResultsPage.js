import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ScoreBoard from '../components/Score/ScoreBoard';
import QuestionCard from '../components/Question/QuestionCard';

const PageContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: ${props => props.theme.spacing.lg} 0;
  background-color: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const DetailsSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  color: ${props => props.theme.colors.textPrimary};
  margin: 0;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all ${props => props.theme.transitions.fast};

  ${props => props.active ? `
    background-color: ${props.theme.colors.primary};
    color: white;
  ` : `
    background-color: ${props.theme.colors.gray200};
    color: ${props.theme.colors.textPrimary};
    
    &:hover {
      background-color: ${props.theme.colors.gray300};
    }
  `}
`;

const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['3xl']};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};

  h3 {
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
  }
`;

const ShareSection = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-top: ${props => props.theme.spacing.xl};
  text-align: center;

  h3 {
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const ShareButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all ${props => props.theme.transitions.fast};
  background-color: ${props => props.theme.colors.gray200};
  color: ${props => props.theme.colors.textPrimary};

  &:hover {
    background-color: ${props => props.theme.colors.gray300};
    transform: translateY(-2px);
  }
`;

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [filter, setFilter] = useState('all'); // all, correct, incorrect

  // Get data from location state (passed from QuizTaker)
  const { result, quiz, questions, userAnswers } = location.state || {};

  if (!result || !quiz || !questions) {
    return (
      <PageContainer>
        <Container>
          <NoResultsMessage>
            <h3>No Results Found</h3>
            <p>Please take a quiz first to see your results.</p>
          </NoResultsMessage>
        </Container>
      </PageContainer>
    );
  }

  const handleRetakeQuiz = () => {
    navigate(`/quiz/${quiz.id}`);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const getFilteredQuestions = () => {
    if (filter === 'all') return questions;
    
    return questions.filter((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      return filter === 'correct' ? isCorrect : !isCorrect;
    });
  };

  const handleShare = (platform) => {
    const message = `I just scored ${result.score}% on "${quiz.title}" quiz! 🎉`;
    const url = window.location.origin;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(`${message} - ${url}`);
        alert('Results copied to clipboard!');
        break;
      default:
        break;
    }
  };

  const filteredQuestions = getFilteredQuestions();

  return (
    <PageContainer>
      <Container>
        <ScoreBoard
          result={result}
          quiz={quiz}
          onRetake={handleRetakeQuiz}
          onViewDetails={handleViewDetails}
          onGoHome={handleGoHome}
        />

        {showDetails && (
          <DetailsSection>
            <SectionHeader>
              <SectionTitle>Question Review</SectionTitle>
              <FilterButtons>
                <FilterButton
                  active={filter === 'all'}
                  onClick={() => setFilter('all')}
                >
                  All ({questions.length})
                </FilterButton>
                <FilterButton
                  active={filter === 'correct'}
                  onClick={() => setFilter('correct')}
                >
                  Correct ({result.correctAnswers})
                </FilterButton>
                <FilterButton
                  active={filter === 'incorrect'}
                  onClick={() => setFilter('incorrect')}
                >
                  Incorrect ({result.totalQuestions - result.correctAnswers})
                </FilterButton>
              </FilterButtons>
            </SectionHeader>

            <QuestionsList>
              {filteredQuestions.map((question, index) => {
                const originalIndex = questions.indexOf(question);
                const userAnswer = userAnswers[originalIndex];
                
                return (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    questionNumber={originalIndex + 1}
                    totalQuestions={questions.length}
                    selectedAnswer={userAnswer}
                    onAnswerSelect={() => {}} // Read-only mode
                    showExplanation={true}
                    disabled={true}
                  />
                );
              })}
            </QuestionsList>
          </DetailsSection>
        )}

        <ShareSection>
          <h3>Share Your Achievement</h3>
          <p>Proud of your score? Share it with your friends and challenge them to beat it!</p>
          <ShareButtons>
            <ShareButton onClick={() => handleShare('twitter')}>
              🐦 Twitter
            </ShareButton>
            <ShareButton onClick={() => handleShare('facebook')}>
              📘 Facebook
            </ShareButton>
            <ShareButton onClick={() => handleShare('copy')}>
              📋 Copy Link
            </ShareButton>
          </ShareButtons>
        </ShareSection>
      </Container>
    </PageContainer>
  );
};

export default ResultsPage;