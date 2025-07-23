import React from 'react';
import styled from 'styled-components';
import { getScoreColor, formatTime, formatDate } from '../../utils/helpers';

const CardContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.spacing.lg};
  transition: all ${props => props.theme.transitions.fast};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  ${props => props.clickable && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.xl};
    }
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const QuizInfo = styled.div`
  flex: 1;
  min-width: 200px;
`;

const QuizTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
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

const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ScoreBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => getScoreColor(props.score)}20;
  color: ${props => getScoreColor(props.score)};
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
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

const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.gray200};
`;

const StatItem = styled.div`
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

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${props => props.theme.colors.gray200};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin-top: ${props => props.theme.spacing.sm};
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${props => getScoreColor(props.score)};
  border-radius: ${props => props.theme.borderRadius.full};
  width: ${props => props.score}%;
  transition: width ${props => props.theme.transitions.normal};
`;

const ActionButton = styled.button`
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: background-color ${props => props.theme.transitions.fast};
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const ScoreCard = ({ 
  attempt, 
  showQuizTitle = true, 
  showStats = true, 
  clickable = false,
  onViewDetails,
  compact = false 
}) => {
  const accuracy = attempt.totalQuestions > 0 
    ? Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100) 
    : 0;

  return (
    <CardContainer clickable={clickable} onClick={clickable ? onViewDetails : undefined}>
      <CardHeader>
        <QuizInfo>
          {showQuizTitle && (
            <QuizTitle>{attempt.quiz?.title || 'Quiz'}</QuizTitle>
          )}
          <QuizMeta>
            <MetaItem>
              📅 {formatDate(attempt.completedAt)}
            </MetaItem>
            <MetaItem>
              ⏱️ {formatTime(attempt.timeSpent)}
            </MetaItem>
            {attempt.quiz?.difficulty && (
              <MetaItem>
                📊 {attempt.quiz.difficulty}
              </MetaItem>
            )}
          </QuizMeta>
        </QuizInfo>

        <ScoreSection>
          <ScoreBadge score={attempt.score}>
            {attempt.score}
          </ScoreBadge>
          {!compact && (
            <ScoreDetails>
              <ScoreValue score={attempt.score}>
                {attempt.score}%
              </ScoreValue>
              <ScoreSubtext>
                {attempt.correctAnswers}/{attempt.totalQuestions} correct
              </ScoreSubtext>
            </ScoreDetails>
          )}
        </ScoreSection>
      </CardHeader>

      {!compact && showStats && (
        <>
          <ProgressBar>
            <ProgressFill score={attempt.score} />
          </ProgressBar>

          <StatsBar>
            <StatItem>
              <StatValue>{attempt.correctAnswers}</StatValue>
              <StatLabel>Correct</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue>{attempt.totalQuestions - attempt.correctAnswers}</StatValue>
              <StatLabel>Wrong</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue>{accuracy}%</StatValue>
              <StatLabel>Accuracy</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatValue>{formatTime(attempt.timeSpent)}</StatValue>
              <StatLabel>Duration</StatLabel>
            </StatItem>
          </StatsBar>
        </>
      )}

      {onViewDetails && !clickable && (
        <ActionButton onClick={onViewDetails}>
          View Details
        </ActionButton>
      )}
    </CardContainer>
  );
};

export default ScoreCard;