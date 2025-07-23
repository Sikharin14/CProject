import React from 'react';
import styled from 'styled-components';
import HistoryList from '../components/History/HistoryList';

const PageContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: ${props => props.theme.spacing.xl} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['2xl']};

  h1 {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.md};

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.typography.fontSize['2xl']};
    }
  }

  p {
    font-size: ${props => props.theme.typography.fontSize.lg};
    color: ${props => props.theme.colors.textSecondary};
    max-width: 600px;
    margin: 0 auto;
    line-height: ${props => props.theme.typography.lineHeight.relaxed};

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.typography.fontSize.base};
    }
  }
`;

const HistoryPage = () => {
  return (
    <PageContainer>
      <Container>
        <PageHeader>
          <h1>Quiz History</h1>
          <p>
            Track your learning progress and review your past quiz performances.
          </p>
        </PageHeader>

        <HistoryList userId={1} />
      </Container>
    </PageContainer>
  );
};

export default HistoryPage;