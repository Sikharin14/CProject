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
  max-width: 450px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
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

const PasswordStrength = styled.div`
  margin-top: ${props => props.theme.spacing.sm};
`;

const StrengthBar = styled.div`
  height: 4px;
  background-color: ${props => props.theme.colors.gray200};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StrengthFill = styled.div`
  height: 100%;
  transition: all ${props => props.theme.transitions.fast};
  border-radius: ${props => props.theme.borderRadius.full};
  width: ${props => props.strength * 25}%;
  background-color: ${props => {
    if (props.strength <= 1) return props.theme.colors.error;
    if (props.strength <= 2) return props.theme.colors.warning;
    if (props.strength <= 3) return props.theme.colors.info;
    return props.theme.colors.success;
  }};
`;

const StrengthText = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => {
    if (props.strength <= 1) return props.theme.colors.error;
    if (props.strength <= 2) return props.theme.colors.warning;
    if (props.strength <= 3) return props.theme.colors.info;
    return props.theme.colors.success;
  }};
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Checkbox = styled.input`
  margin: 0;
  accent-color: ${props => props.theme.colors.primary};
`;

const CheckboxLabel = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  line-height: ${props => props.theme.typography.lineHeight.normal};
  cursor: pointer;
  margin: 0;

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
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
`;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const getPasswordStrengthText = (strength) => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return labels[strength] || 'Very Weak';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      const response = await mockApi.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      console.log('Registration successful:', response.data);
      
      // Redirect to home page or login page
      navigate('/');
    } catch (error) {
      setGeneralError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader>
        <h1>Create Account</h1>
        <p>Join QuizApp and start your learning journey</p>
      </FormHeader>

      <DemoNotice>
        <h4>🚀 Demo Mode</h4>
        <p>
          This is a demo registration form. All fields are functional 
          but no actual account will be created.
        </p>
      </DemoNotice>

      {generalError && (
        <ErrorMessage>
          ⚠️ {generalError}
        </ErrorMessage>
      )}

      <FormRow>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            error={errors.firstName}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <ErrorMessage>
              ⚠️ {errors.firstName}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            error={errors.lastName}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <ErrorMessage>
              ⚠️ {errors.lastName}
            </ErrorMessage>
          )}
        </FormGroup>
      </FormRow>

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
          placeholder="Create a strong password"
          error={errors.password}
          autoComplete="new-password"
        />
        {formData.password && (
          <PasswordStrength>
            <StrengthBar>
              <StrengthFill strength={passwordStrength} />
            </StrengthBar>
            <StrengthText strength={passwordStrength}>
              {getPasswordStrengthText(passwordStrength)}
            </StrengthText>
          </PasswordStrength>
        )}
        {errors.password && (
          <ErrorMessage>
            ⚠️ {errors.password}
          </ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <ErrorMessage>
            ⚠️ {errors.confirmPassword}
          </ErrorMessage>
        )}
      </FormGroup>

      <CheckboxGroup>
        <Checkbox
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
        />
        <CheckboxLabel htmlFor="agreeToTerms">
          I agree to the <button type="button" style={{background: 'none', border: 'none', color: '#2196F3', textDecoration: 'underline', cursor: 'pointer'}} onClick={(e) => e.preventDefault()}>Terms of Service</button> and{' '}
          <button type="button" style={{background: 'none', border: 'none', color: '#2196F3', textDecoration: 'underline', cursor: 'pointer'}} onClick={(e) => e.preventDefault()}>Privacy Policy</button>
        </CheckboxLabel>
      </CheckboxGroup>
      {errors.agreeToTerms && (
        <ErrorMessage>
          ⚠️ {errors.agreeToTerms}
        </ErrorMessage>
      )}

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="loading" style={{ width: '16px', height: '16px' }}></div>
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </SubmitButton>

      <FormFooter>
        <FooterText>
          Already have an account?{' '}
          <FooterLink to="/login">
            Sign in here
          </FooterLink>
        </FooterText>
      </FormFooter>
    </FormContainer>
  );
};

export default RegisterForm;