import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDuration, getDifficultyColor } from '../../utils/helpers';

const Card = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const CardImage = styled.div`
  height: 160px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const CardImageIcon = styled.div`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  color: white;
  z-index: 1;
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const CardHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.sm};
  line-height: ${props => props.theme.typography.lineHeight.tight};
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: ${props => props.theme.typography.lineHeight.normal};
  margin-bottom: 0;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
`;

const MetaBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  background-color: ${props => props.theme.colors.gray100};
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const DifficultyBadge = styled(MetaBadge)`
  background-color: ${props => getDifficultyColor(props.difficulty)}20;
  color: ${props => getDifficultyColor(props.difficulty)};
`;

const CategoryBadge = styled(MetaBadge)`
  background-color: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.md};
`;

const QuizStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const StartButton = styled(Link)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.sm};
  text-decoration: none;
  transition: background-color ${props => props.theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    color: white;
  }
`;

const QuizCard = ({ quiz, className }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Programming': '💻',
      'Web Development': '🌐',
      'Database': '🗄️',
      'Mobile': '📱',
      'DevOps': '⚙️',
      'Design': '🎨',
      'General': '📚'
    };
    return icons[category] || '📚';
  };

  return (
    <Card className={className}>
      <CardImage>
        <CardImageIcon>
          {getCategoryIcon(quiz.category)}
        </CardImageIcon>
      </CardImage>
      
      <CardContent>
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
        </CardHeader>

        <CardMeta>
          <CategoryBadge>
            📂 {quiz.category}
          </CategoryBadge>
          <DifficultyBadge difficulty={quiz.difficulty}>
            📊 {quiz.difficulty}
          </DifficultyBadge>
          <MetaBadge>
            ⏱️ {formatDuration(quiz.timeLimit)}
          </MetaBadge>
        </CardMeta>

        <CardFooter>
          <QuizStats>
            <StatItem>
              <span>📝</span>
              <span>{quiz.questionCount} questions</span>
            </StatItem>
          </QuizStats>
          
          <StartButton to={`/quiz/${quiz.id}`}>
            Start Quiz
          </StartButton>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default QuizCard;