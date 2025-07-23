import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getScoreColor, formatTime, formatDateTime, getDifficultyColor } from '../../utils/helpers';

const ItemContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.spacing.lg};
  transition: all ${props => props.theme.transitions.fast};
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const QuizInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const QuizTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  line-height: ${props => props.theme.typography.lineHeight.tight};
  
  /* Truncate long titles */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    white-space: normal;
    overflow: visible;
  }
`;

const QuizMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const CategoryBadge = styled.span`
  background-color: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const DifficultyBadge = styled.span`
  background-color: ${props => getDifficultyColor(props.difficulty)}20;
  color: ${props => getDifficultyColor(props.difficulty)};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: space-between;
  }
`;

const ScoreBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => getScoreColor(props.score)}20;
  color: ${props => getScoreColor(props.score)};
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  border: 2px solid ${props => getScoreColor(props.score)}40;
`;

const ScoreDetails = styled.div`
  text-align: right;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    text-align: left;
  }
`;

const ScoreValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => getScoreColor(props.score)};
  line-height: 1;
`;

const ScoreSubtext = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.xs};
`;

const ItemBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const StatGroup = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProgressSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${props => props.theme.colors.gray200};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${props => getScoreColor(props.score)};
  border-radius: ${props => props.theme.borderRadius.full};
  width: ${props => props.score}%;
  transition: width ${props => props.theme.transitions.normal};
`;

const ItemFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const CompletedDate = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ActionButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const ViewDetailsButton = styled(ActionButton)`
  background-color: ${props => props.theme.colors.primary};
  color: white;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const RetakeButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.gray200};
  color: ${props => props.theme.colors.textPrimary};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.gray300};
    color: ${props => props.theme.colors.textPrimary};
    transform: translateY(-1px);
  }
`;

const HistoryItem = ({ attempt, onViewDetails }) => {
  const accuracy = attempt.totalQuestions > 0 
    ? Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100) 
    : 0;

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(attempt);
    }
  };

  const handleItemClick = () => {
    if (onViewDetails) {
      onViewDetails(attempt);
    }
  };

  return (
    <ItemContainer onClick={handleItemClick}>
      <ItemHeader>
        <QuizInfo>
          <QuizTitle>{attempt.quiz?.title || 'Unknown Quiz'}</QuizTitle>
          <QuizMeta>
            {attempt.quiz?.category && (
              <CategoryBadge>{attempt.quiz.category}</CategoryBadge>
            )}
            {attempt.quiz?.difficulty && (
              <DifficultyBadge difficulty={attempt.quiz.difficulty}>
                {attempt.quiz.difficulty}
              </DifficultyBadge>
            )}
            <MetaItem>
              📝 {attempt.totalQuestions} questions
            </MetaItem>
          </QuizMeta>
        </QuizInfo>

        <ScoreSection>
          <ScoreBadge score={attempt.score}>
            {attempt.score}
          </ScoreBadge>
          <ScoreDetails>
            <ScoreValue score={attempt.score}>
              {attempt.score}%
            </ScoreValue>
            <ScoreSubtext>
              {attempt.correctAnswers}/{attempt.totalQuestions} correct
            </ScoreSubtext>
          </ScoreDetails>
        </ScoreSection>
      </ItemHeader>

      <ProgressSection>
        <ProgressLabel>
          <span>Progress</span>
          <span>{accuracy}% accuracy</span>
        </ProgressLabel>
        <ProgressBar>
          <ProgressFill score={attempt.score} />
        </ProgressBar>
      </ProgressSection>

      <ItemBody>
        <StatGroup>
          <StatValue>{attempt.correctAnswers}</StatValue>
          <StatLabel>Correct</StatLabel>
        </StatGroup>
        
        <StatGroup>
          <StatValue>{attempt.totalQuestions - attempt.correctAnswers}</StatValue>
          <StatLabel>Incorrect</StatLabel>
        </StatGroup>
        
        <StatGroup>
          <StatValue>{formatTime(attempt.timeSpent)}</StatValue>
          <StatLabel>Time Taken</StatLabel>
        </StatGroup>

        <StatGroup>
          <StatValue>{accuracy}%</StatValue>
          <StatLabel>Accuracy</StatLabel>
        </StatGroup>
      </ItemBody>

      <ItemFooter>
        <CompletedDate>
          📅 Completed {formatDateTime(attempt.completedAt)}
        </CompletedDate>

        <ActionButtons>
          <ViewDetailsButton onClick={handleViewDetails}>
            👁️ Details
          </ViewDetailsButton>
          
          <RetakeButton 
            to={`/quiz/${attempt.quizId}`}
            onClick={(e) => e.stopPropagation()}
          >
            🔄 Retake
          </RetakeButton>
        </ActionButtons>
      </ItemFooter>
    </ItemContainer>
  );
};

export default HistoryItem;