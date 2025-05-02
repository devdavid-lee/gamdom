import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:hover {
    text-decoration: underline;
  }
`; 