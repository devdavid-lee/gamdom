import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '../../../test-utils';
import { Footer } from './Footer';

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to} data-testid={`link-${to.replace('/', '')}`}>
      {children}
    </a>
  ),
}));

describe('Footer Component', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Gamdom. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders all footer links', () => {
    render(<Footer />);
    
    expect(screen.getByTestId('link-terms')).toHaveAttribute('href', '/terms');
    expect(screen.getByTestId('link-privacy')).toHaveAttribute('href', '/privacy');
    expect(screen.getByTestId('link-contact')).toHaveAttribute('href', '/contact');
    
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders footer with correct structure', () => {
    const { container } = render(<Footer />);
    
    expect(container.querySelector('footer')).toBeInTheDocument();
    expect(container.querySelector('footer > div')).toBeInTheDocument();
    expect(container.querySelector('footer > div > div')).toBeInTheDocument();
  });
}); 