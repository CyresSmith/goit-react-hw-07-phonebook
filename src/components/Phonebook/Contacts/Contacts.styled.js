import styled from 'styled-components';
import theme from 'theme';

export const ContactsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[4]};
  width: 100%;
`;

export const Contact = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc((100% - (${theme.space[4]} * 2)) / 3);
  font-size: ${theme.fontSizes.m};
  padding: ${theme.space[4]};
  color: ${theme.colors.secondary};
  background-color: ${theme.colors.primary};
  border-radius: ${theme.radii.high};
  box-shadow: ${theme.shadow.medium};
`;

export const Name = styled.span`
  font-weight: ${theme.fontWeights.bold};
  margin-left: ${theme.space[3]};
  margin-right: ${theme.space[3]};
`;

export const Phone = styled.span`
  margin-left: ${theme.space[3]};
  margin-right: ${theme.space[3]};
`;

export const DeletBtn = styled.button`
  display: inline-flex;
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.m};
  font-weight: ${theme.fontWeights.regular};
  padding: ${theme.space[2]};
  color: ${theme.colors.secondary};
  background-color: ${p => (p.disabled ? theme.colors.muted : 'salmon')};
  cursor: pointer;
  border: ${theme.borders.none};
  border-radius: ${theme.radii.normal};
  box-shadow: ${theme.shadow.low};
  transition-property: all;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;

  :hover:not(:disabled) {
    background-color: red;
    box-shadow: ${theme.shadow.medium};
    scale: 1.05;
  }
`;

export const EditBtn = styled.button`
  display: inline-flex;
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.m};
  font-weight: ${theme.fontWeights.regular};
  padding: ${theme.space[2]};
  color: ${theme.colors.accent};
  background-color: ${p =>
    p.disabled ? theme.colors.muted : theme.colors.background};
  cursor: pointer;
  border: ${theme.borders.none};
  border-radius: ${theme.radii.normal};
  box-shadow: ${theme.shadow.low};
  transition-property: all;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;
  margin-bottom: ${theme.space[4]};

  :hover:not(:disabled) {
    background-color: ${theme.colors.secondary};
    box-shadow: ${theme.shadow.medium};
    scale: 1.05;
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
