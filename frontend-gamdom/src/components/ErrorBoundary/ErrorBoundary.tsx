import React from 'react';
import * as S from './ErrorBoundary.styles';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error caught by ErrorBoundary:', error, errorInfo);
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <S.Container data-testid="error-boundary">
          <S.ErrorTitle>Something went wrong</S.ErrorTitle>
          <S.ErrorMessage>{this.state.error?.message}</S.ErrorMessage>
          <S.RetryButton
            data-testid="retry-button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
          >
            Try Again
          </S.RetryButton>
        </S.Container>
      );
    }

    return this.props.children;
  }
} 