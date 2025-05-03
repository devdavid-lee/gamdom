import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '../../test-utils';
import { LoadingSpinner } from './LoadingSpinner';

jest.mock('./LoadingSpinner.styles', () => ({
  SpinnerContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="spinner-container">{children}</div>
  ),
  Spinner: () => <div data-testid="spinner" />,
}));

describe('LoadingSpinner Component', () => {
  it('renders spinner container', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('spinner-container')).toBeInTheDocument();
  });

  it('renders spinner element', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders spinner inside container', () => {
    const { container } = render(<LoadingSpinner />);
    
    const spinnerContainer = container.querySelector('[data-testid="spinner-container"]');
    const spinner = spinnerContainer?.querySelector('[data-testid="spinner"]');
    
    expect(spinnerContainer).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
    expect(spinnerContainer?.children.length).toBe(1);
  });
}); 