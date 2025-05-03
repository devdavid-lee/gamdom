import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '../../../test-utils';
import { Header } from './Header';

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to} data-testid={`link-${to.replace('/', '')}`}>
      {children}
    </a>
  ),
}));

describe('Header Component', () => {
  it('renders header with correct structure', () => {
    render(<Header />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('header-content')).toBeInTheDocument();
  });

  it('renders logo with correct text', () => {
    render(<Header />);
    expect(screen.getByTestId('logo')).toHaveTextContent('Gamdom');
  });

  it('renders all elements in correct hierarchy', () => {
    const { container } = render(<Header />);
    
    const header = container.querySelector('[data-testid="header"]');
    const content = header?.querySelector('[data-testid="header-content"]');
    const nav = content?.querySelector('[data-testid="nav"]');
    
    expect(header).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    
    expect(nav?.querySelector('[data-testid="link-"]')).toBeInTheDocument();
    expect(nav?.querySelector('[data-testid="link-events"]')).toBeInTheDocument();
  });
});
