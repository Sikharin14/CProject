import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex.sticky};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
`;

const Logo = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.white};
    flex-direction: column;
    padding: ${props => props.theme.spacing.lg};
    box-shadow: ${props => props.theme.shadows.md};
    gap: ${props => props.theme.spacing.md};
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.textPrimary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.fast};
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.gray100};
  }

  ${props => props.isActive && `
    color: ${props.theme.colors.primary};
    background-color: ${props.theme.colors.gray100};
  `}
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
    padding-top: ${props => props.theme.spacing.md};
    border-top: 1px solid ${props => props.theme.colors.gray200};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const LoginButton = styled(Link)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: background-color ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    color: white;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: ${props => props.theme.colors.textPrimary};
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
    
    &:nth-child(1) {
      top: ${props => props.isOpen ? '10px' : '5px'};
      transform: ${props => props.isOpen ? 'rotate(135deg)' : 'rotate(0deg)'};
    }
    
    &:nth-child(2) {
      top: 10px;
      opacity: ${props => props.isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      top: ${props => props.isOpen ? '10px' : '15px'};
      transform: ${props => props.isOpen ? 'rotate(-135deg)' : 'rotate(0deg)'};
    }
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Mock user - in real app, this would come from auth context
  const currentUser = {
    firstName: 'John',
    lastName: 'Doe',
    avatar: null
  };

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/" onClick={closeMenu}>
          <LogoIcon>Q</LogoIcon>
          QuizApp
        </Logo>

        <Nav isOpen={isMenuOpen}>
          <NavLink 
            to="/" 
            isActive={isActive('/')}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/quizzes" 
            isActive={isActive('/quizzes')}
            onClick={closeMenu}
          >
            Quizzes
          </NavLink>
          <NavLink 
            to="/history" 
            isActive={isActive('/history')}
            onClick={closeMenu}
          >
            History
          </NavLink>
        </Nav>

        <UserSection isOpen={isMenuOpen}>
          {currentUser ? (
            <UserInfo>
              <Avatar>
                {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
              </Avatar>
              <span>{currentUser.firstName}</span>
            </UserInfo>
          ) : (
            <LoginButton to="/login" onClick={closeMenu}>
              Login
            </LoginButton>
          )}
        </UserSection>

        <MobileMenuButton onClick={toggleMenu}>
          <MenuIcon isOpen={isMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </MenuIcon>
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;