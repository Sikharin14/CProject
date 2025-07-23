import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import QuizTaker from '../components/Quiz/QuizTaker';

const PageContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: ${props => props.theme.spacing.lg} 0;
  background-color: ${props => props.theme.colors.background};
`;

const QuizTakingPage = () => {
  const { id } = useParams();

  return (
    <PageContainer>
      <QuizTaker quizId={parseInt(id)} />
    </PageContainer>
  );
};

export default QuizTakingPage;