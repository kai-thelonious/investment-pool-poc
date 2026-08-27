import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Test crash event');
};

describe('ErrorBoundary', () => {
  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>Normal Application Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal Application Content')).toBeInTheDocument();
  });

  it('renders error fallback UI when an uncaught error occurs', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test crash event')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
