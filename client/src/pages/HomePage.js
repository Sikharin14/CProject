import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: calc(100vh - 200px);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: ${props => props.theme.spacing['4xl']} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};

  h1 {
    font-size: ${props => props.theme.typography.fontSize['5xl']};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    margin-bottom: ${props => props.theme.spacing.lg};
    color: white;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.typography.fontSize['3xl']};
    }
  }

  p {
    font-size: ${props => props.theme.typography.fontSize.xl};
    margin-bottom: ${props => props.theme.spacing.xl};
    opacity: 0.9;
    line-height: ${props => props.theme.typography.lineHeight.relaxed};

    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.typography.fontSize.lg};
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.lg};
  text-decoration: none;
  transition: transform ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.lg};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
    color: ${props => props.theme.colors.primaryDark};
  }
`;

const FeaturesSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background-color: ${props => props.theme.colors.white};
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.xl};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: ${props => props.theme.colors.gray100};
  transition: transform ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;

const StatsSection = styled.section`
  background-color: ${props => props.theme.colors.gray100};
  padding: ${props => props.theme.spacing['3xl']} 0;
`;

const StatsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    margin-bottom: 0;
  }
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <h1>Test Your Knowledge</h1>
          <p>
            Challenge yourself with our comprehensive quiz platform. 
            Learn, practice, and improve your skills across various topics.
          </p>
          <CTAButton to="/quizzes">
            Start Your First Quiz
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>Why Choose QuizApp?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🧠</FeatureIcon>
              <FeatureTitle>Smart Learning</FeatureTitle>
              <FeatureDescription>
                Interactive quizzes designed to enhance your understanding 
                and retention of key concepts.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Track Progress</FeatureTitle>
              <FeatureDescription>
                Monitor your performance with detailed analytics and 
                personalized insights to improve your learning.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>Multiple Categories</FeatureTitle>
              <FeatureDescription>
                Choose from various topics including programming, 
                web development, databases, and more.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <StatsSection>
        <StatsContainer>
          <SectionTitle>Join Our Learning Community</SectionTitle>
          <StatsGrid>
            <StatItem>
              <h3>50+</h3>
              <p>Available Quizzes</p>
            </StatItem>
            <StatItem>
              <h3>1000+</h3>
              <p>Questions</p>
            </StatItem>
            <StatItem>
              <h3>500+</h3>
              <p>Active Learners</p>
            </StatItem>
            <StatItem>
              <h3>95%</h3>
              <p>Success Rate</p>
            </StatItem>
          </StatsGrid>
        </StatsContainer>
      </StatsSection>
    </HomeContainer>
  );
};

export default HomePage;