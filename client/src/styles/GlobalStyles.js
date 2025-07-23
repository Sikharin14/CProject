import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: ${props => props.theme.typography.fontSize.base};
    line-height: ${props => props.theme.typography.lineHeight.normal};
    color: ${props => props.theme.colors.textPrimary};
    background-color: ${props => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all ${props => props.theme.transitions.fast};

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: 1px solid ${props => props.theme.colors.gray300};
    border-radius: ${props => props.theme.borderRadius.base};
    transition: border-color ${props => props.theme.transitions.fast};

    &:focus {
      border-color: ${props => props.theme.colors.primary};
    }

    &:disabled {
      background-color: ${props => props.theme.colors.gray100};
      cursor: not-allowed;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    line-height: ${props => props.theme.typography.lineHeight.tight};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  h1 {
    font-size: ${props => props.theme.typography.fontSize['4xl']};
  }

  h2 {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
  }

  h3 {
    font-size: ${props => props.theme.typography.fontSize['2xl']};
  }

  h4 {
    font-size: ${props => props.theme.typography.fontSize.xl};
  }

  h5 {
    font-size: ${props => props.theme.typography.fontSize.lg};
  }

  h6 {
    font-size: ${props => props.theme.typography.fontSize.base};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
    line-height: ${props => props.theme.typography.lineHeight.relaxed};
  }

  ul, ol {
    margin-bottom: ${props => props.theme.spacing.md};
    padding-left: ${props => props.theme.spacing.lg};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.md};

    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      padding: 0 ${props => props.theme.spacing.lg};
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid ${props => props.theme.colors.gray300};
    border-radius: 50%;
    border-top-color: ${props => props.theme.colors.primary};
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.3s ease-out;
  }
`;