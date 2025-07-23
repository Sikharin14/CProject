import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/Auth/RegisterForm';

const PageContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: ${props => props.theme.spacing.xl} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 0 ${props => props.theme.spacing.md};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const RegisterPage = () => {
  return (
    <PageContainer>
      <Container>
        <RegisterForm />
      </Container>
    </PageContainer>
  );
};

export default RegisterPage;