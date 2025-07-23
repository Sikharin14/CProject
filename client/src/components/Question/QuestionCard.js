import React from 'react';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const QuestionHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const QuestionNumber = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const QuestionText = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.textPrimary};
  line-height: ${props => props.theme.typography.lineHeight.normal};
  margin-bottom: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.typography.fontSize.lg};
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const OptionButton = styled.button`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  width: 100%;
  padding: ${props => props.theme.spacing.lg};
  border: 2px solid ${props => props.theme.colors.gray200};
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.textPrimary};
  text-align: left;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  font-size: ${props => props.theme.typography.fontSize.base};
  line-height: ${props => props.theme.typography.lineHeight.normal};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary}10;
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  ${props => props.selected && `
    border-color: ${props.theme.colors.primary};
    background-color: ${props.theme.colors.primary}20;
    
    &:hover {
      background-color: ${props.theme.colors.primary}30;
    }
  `}

  ${props => props.disabled && `
    cursor: not-allowed;
    opacity: 0.6;
    
    &:hover {
      transform: none;
      border-color: ${props.theme.colors.gray200};
      background-color: ${props.theme.colors.white};
    }
  `}
`;

const OptionLetter = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => props.theme.colors.gray200};
  color: ${props => props.theme.colors.textPrimary};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.sm};
  flex-shrink: 0;
  transition: all ${props => props.theme.transitions.fast};

  ${props => props.selected && `
    background-color: ${props.theme.colors.primary};
    color: white;
  `}
`;

const OptionText = styled.span`
  flex: 1;
  word-break: break-word;
`;

const ExplanationContainer = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.showCorrect ? props.theme.colors.success : props.theme.colors.error}10;
  border-left: 4px solid ${props => props.showCorrect ? props.theme.colors.success : props.theme.colors.error};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const ExplanationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.showCorrect ? props.theme.colors.success : props.theme.colors.error};
`;

const ExplanationText = styled.p`
  color: ${props => props.theme.colors.textPrimary};
  margin: 0;
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;

const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect, 
  showExplanation = false,
  disabled = false 
}) => {
  const getOptionLetter = (index) => {
    return String.fromCharCode(65 + index); // A, B, C, D...
  };


  const renderExplanation = () => {
    if (!showExplanation || selectedAnswer === null) return null;

    const isCorrect = selectedAnswer === question.correctAnswer;
    
    return (
      <ExplanationContainer showCorrect={isCorrect}>
        <ExplanationHeader showCorrect={isCorrect}>
          <span>{isCorrect ? '✅' : '❌'}</span>
          <span>{isCorrect ? 'Correct!' : 'Incorrect'}</span>
        </ExplanationHeader>
        {question.explanation && (
          <ExplanationText>{question.explanation}</ExplanationText>
        )}
        {!isCorrect && (
          <ExplanationText>
            <strong>Correct answer:</strong> {getOptionLetter(question.correctAnswer)}) {question.options[question.correctAnswer]}
          </ExplanationText>
        )}
      </ExplanationContainer>
    );
  };

  return (
    <QuestionContainer>
      <QuestionHeader>
        <QuestionNumber>
          Question {questionNumber} of {totalQuestions}
        </QuestionNumber>
        <QuestionText>{question.question}</QuestionText>
      </QuestionHeader>

      <OptionsContainer>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            selected={selectedAnswer === index}
            disabled={disabled}
            onClick={() => !disabled && onAnswerSelect(index)}
            aria-label={`Option ${getOptionLetter(index)}: ${option}`}
          >
            <OptionLetter selected={selectedAnswer === index}>
              {getOptionLetter(index)}
            </OptionLetter>
            <OptionText>{option}</OptionText>
          </OptionButton>
        ))}
      </OptionsContainer>

      {renderExplanation()}
    </QuestionContainer>
  );
};

export default QuestionCard;