import styled from 'styled-components';
import theme from 'theme';

export const StyledButton = styled('button')`
  display: inline-flex;
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.m};
  font-weight: ${theme.fontWeights.regular};
  padding: ${theme.space[3]};
  color: ${theme.colors.secondary};
  background-color: ${p =>
    p.disabled ? theme.colors.muted : theme.colors.accent};
  cursor: pointer;
  border: ${theme.borders.none};
  border-radius: ${theme.radii.normal};
  box-shadow: ${theme.shadow.medium};
  transition-property: all;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;

  :hover:not(:disabled) {
    background-color: ${theme.colors.accent};
    box-shadow: ${theme.shadow.high};
    scale: 1.1;
  }
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 1s linear 0s infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export const ButtonText = styled.span`
  margin-left: ${p => (p.isIconThere ? theme.space[3] : theme.space[0])};
`;
