import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/Auth/LoginForm';

const PageContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: ${props => props.theme.spacing.xl} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  max-width: 450px;
  width: 100%;
  padding: 0 ${props => props.theme.spacing.md};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const LoginPage = () => {
  return (
    <PageContainer>
      <Container>
        <LoginForm />
      </Container>
    </PageContainer>
  );
};

export default LoginPage;