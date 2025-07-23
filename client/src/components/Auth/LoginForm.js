import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { validateEmail, validatePassword } from '../../utils/helpers';
import { mockApi } from '../../utils/mockApi';

const FormContainer = styled.form`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.xl};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};

  h1 {
    font-size: ${props => props.theme.typography.fontSize['2xl']};
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  transition: all ${props => props.theme.transitions.fast};
  background-color: ${props => props.theme.colors.white};

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray500};
  }

  ${props => props.error && `
    border-color: ${props.theme.colors.error};
    
    &:focus {
      border-color: ${props.theme.colors.error};
      box-shadow: 0 0 0 3px ${props.theme.colors.error}20;
    }
  `}
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormFooter = styled.div`
  text-align: center;
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.gray200};
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

const DemoNotice = styled.div`
  background-color: ${props => props.theme.colors.info}10;
  border: 1px solid ${props => props.theme.colors.info}30;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;

  h4 {
    color: ${props => props.theme.colors.info};
    font-size: ${props => props.theme.typography.fontSize.sm};
    margin-bottom: ${props => props.theme.spacing.xs};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.typography.fontSize.xs};
    margin: 0;
    line-height: ${props => props.theme.typography.lineHeight.normal};
  }

  code {
    background-color: ${props => props.theme.colors.gray100};
    padding: 2px 4px;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: ${props => props.theme.typography.fontSize.xs};
  }
`;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setGeneralError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setGeneralError('');

    try {
      const response = await mockApi.login({
        email: formData.email,
        password: formData.password
      });

      // In a real app, you would store the token and user data
      console.log('Login successful:', response.data);
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      setGeneralError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setFormData({
      email: 'john@example.com',
      password: 'password123'
    });
    
    // Auto-submit after a short delay
    setTimeout(() => {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      document.querySelector('form').dispatchEvent(submitEvent);
    }, 500);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader>
        <h1>Welcome Back</h1>
        <p>Sign in to your account to continue</p>
      </FormHeader>

      <DemoNotice>
        <h4>🚀 Demo Mode</h4>
        <p>
          This is a demo. Use <code>john@example.com</code> and any password to login,
          or click the button below for quick access.
        </p>
        <button
          type="button"
          onClick={handleDemoLogin}
          style={{
            marginTop: '8px',
            padding: '4px 12px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Demo Login
        </button>
      </DemoNotice>

      {generalError && (
        <ErrorMessage>
          ⚠️ {generalError}
        </ErrorMessage>
      )}

      <FormGroup>
        <Label htmlFor="email">Email Address</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          error={errors.email}
          autoComplete="email"
        />
        {errors.email && (
          <ErrorMessage>
            ⚠️ {errors.email}
          </ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={errors.password}
          autoComplete="current-password"
        />
        {errors.password && (
          <ErrorMessage>
            ⚠️ {errors.password}
          </ErrorMessage>
        )}
      </FormGroup>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="loading" style={{ width: '16px', height: '16px' }}></div>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </SubmitButton>

      <FormFooter>
        <FooterText>
          Don't have an account?{' '}
          <FooterLink to="/register">
            Create one here
          </FooterLink>
        </FooterText>
      </FormFooter>
    </FormContainer>
  );
};

export default LoginForm;