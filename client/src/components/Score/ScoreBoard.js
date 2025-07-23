import React from 'react';
import styled from 'styled-components';
import { getScoreColor, getScoreGrade, formatTime } from '../../utils/helpers';

const ScoreBoardContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  padding: ${props => props.theme.spacing['2xl']};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ScoreHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ScoreTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.typography.fontSize['2xl']};
  }
`;

const QuizTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  margin-bottom: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.typography.fontSize.lg};
  }
`;

const ScoreDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ScoreCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    ${props => getScoreColor(props.score)} ${props => props.score * 3.6}deg,
    ${props => props.theme.colors.gray200} ${props => props.score * 3.6}deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    background-color: ${props => props.theme.colors.white};
    border-radius: 50%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 120px;
    height: 120px;

    &::before {
      width: 95px;
      height: 95px;
    }
  }
`;

const ScoreValue = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const ScoreNumber = styled.div`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => getScoreColor(props.score)};
  line-height: 1;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.typography.fontSize['2xl']};
  }
`;

const ScorePercentage = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.xs};
`;

const GradeDisplay = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => getScoreColor(props.score)}20;
  color: ${props => getScoreColor(props.score)};
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PerformanceMessage = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => getScoreColor(props.score)}10;
  border-left: 4px solid ${props => getScoreColor(props.score)};
  margin-bottom: ${props => props.theme.spacing.xl};

  p {
    margin: 0;
    color: ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.typography.fontSize.base};
    line-height: ${props => props.theme.typography.lineHeight.relaxed};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.base};
  transition: all ${props => props.theme.transitions.fast};
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
`;

const PrimaryButton = styled(ActionButton)`
  background-color: ${props => props.theme.colors.primary};
  color: white;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(ActionButton)`
  background-color: ${props => props.theme.colors.gray200};
  color: ${props => props.theme.colors.textPrimary};

  &:hover {
    background-color: ${props => props.theme.colors.gray300};
    transform: translateY(-2px);
  }
`;

const ScoreBoard = ({ result, quiz, onRetake, onViewDetails, onGoHome }) => {
  const getPerformanceMessage = (score) => {
    if (score >= 90) {
      return "Excellent work! You've mastered this topic. Keep up the outstanding performance!";
    } else if (score >= 70) {
      return "Great job! You have a solid understanding of the material with room for minor improvements.";
    } else if (score >= 50) {
      return "Good effort! You're on the right track, but consider reviewing the material to strengthen your knowledge.";
    } else {
      return "Keep practicing! This is a great learning opportunity. Review the explanations and try again.";
    }
  };

  return (
    <ScoreBoardContainer>
      <ScoreHeader>
        <ScoreTitle>Quiz Complete!</ScoreTitle>
        <QuizTitle>{quiz.title}</QuizTitle>
      </ScoreHeader>

      <ScoreDisplay>
        <GradeDisplay score={result.score}>
          {getScoreGrade(result.score)}
        </GradeDisplay>
        
        <ScoreCircle score={result.score}>
          <ScoreValue>
            <ScoreNumber score={result.score}>
              {result.score}
            </ScoreNumber>
            <ScorePercentage>out of 100</ScorePercentage>
          </ScoreValue>
        </ScoreCircle>
      </ScoreDisplay>

      <StatsGrid>
        <StatItem>
          <StatValue>{result.correctAnswers}</StatValue>
          <StatLabel>Correct</StatLabel>
        </StatItem>
        
        <StatItem>
          <StatValue>{result.totalQuestions - result.correctAnswers}</StatValue>
          <StatLabel>Incorrect</StatLabel>
        </StatItem>
        
        <StatItem>
          <StatValue>{result.totalQuestions}</StatValue>
          <StatLabel>Total</StatLabel>
        </StatItem>
        
        <StatItem>
          <StatValue>{formatTime(result.timeSpent)}</StatValue>
          <StatLabel>Time Spent</StatLabel>
        </StatItem>
      </StatsGrid>

      <PerformanceMessage score={result.score}>
        <p>{getPerformanceMessage(result.score)}</p>
      </PerformanceMessage>

      <ActionButtons>
        <PrimaryButton onClick={onViewDetails}>
          📊 View Details
        </PrimaryButton>
        
        <SecondaryButton onClick={onRetake}>
          🔄 Retake Quiz
        </SecondaryButton>
        
        <SecondaryButton onClick={onGoHome}>
          🏠 Back to Home
        </SecondaryButton>
      </ActionButtons>
    </ScoreBoardContainer>
  );
};

export default ScoreBoard;