import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatTime } from '../../utils/helpers';

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 2px solid ${props => props.isWarning ? props.theme.colors.warning : 
    props.isCritical ? props.theme.colors.error : props.theme.colors.gray200};
`;

const TimerIcon = styled.div`
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

const TimerContent = styled.div`
  flex: 1;
`;

const TimerLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TimerValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.isWarning ? props.theme.colors.warning : 
    props.isCritical ? props.theme.colors.error : props.theme.colors.textPrimary};
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
`;

const ProgressBar = styled.div`
  width: 100px;
  height: 6px;
  background-color: ${props => props.theme.colors.gray200};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.isCritical ? 
    `linear-gradient(90deg, ${props.theme.colors.error}, ${props.theme.colors.warning})` :
    props.isWarning ?
    `linear-gradient(90deg, ${props.theme.colors.warning}, ${props.theme.colors.primary})` :
    `linear-gradient(90deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`
  };
  border-radius: ${props => props.theme.borderRadius.full};
  transition: width ${props => props.theme.transitions.normal};
  width: ${props => props.percentage}%;
`;

const QuestionTimer = ({ 
  totalTime, 
  onTimeUp, 
  isActive = true, 
  showProgress = true 
}) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(isActive);

  useEffect(() => {
    setTimeLeft(totalTime);
  }, [totalTime]);

  useEffect(() => {
    setIsRunning(isActive);
  }, [isActive]);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setIsRunning(false);
            if (onTimeUp) {
              onTimeUp();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, onTimeUp]);

  const getTimePercentage = () => {
    return totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  };

  const isWarning = () => {
    return timeLeft <= totalTime * 0.25 && timeLeft > totalTime * 0.1;
  };

  const isCritical = () => {
    return timeLeft <= totalTime * 0.1;
  };

  const getTimerIcon = () => {
    if (isCritical()) return '🚨';
    if (isWarning()) return '⚠️';
    return '⏱️';
  };

  const getTimerStatus = () => {
    if (timeLeft === 0) return 'Time\'s up!';
    if (isCritical()) return 'Hurry up!';
    if (isWarning()) return 'Running low';
    return 'Time remaining';
  };

  return (
    <TimerContainer isWarning={isWarning()} isCritical={isCritical()}>
      <TimerIcon>{getTimerIcon()}</TimerIcon>
      
      <TimerContent>
        <TimerLabel>{getTimerStatus()}</TimerLabel>
        <TimerValue isWarning={isWarning()} isCritical={isCritical()}>
          {formatTime(timeLeft)}
        </TimerValue>
      </TimerContent>

      {showProgress && (
        <ProgressBar>
          <ProgressFill 
            percentage={getTimePercentage()} 
            isWarning={isWarning()} 
            isCritical={isCritical()}
          />
        </ProgressBar>
      )}
    </TimerContainer>
  );
};

export default QuestionTimer;