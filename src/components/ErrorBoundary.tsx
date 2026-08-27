import { Component, ErrorInfo, ReactNode } from 'react';
import { kamiTheme } from '../constants/theme';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className={`min-h-screen ${kamiTheme.bgPage} ${kamiTheme.textPrimary} flex items-center justify-center p-6 font-serif antialiased`}
        >
          <div
            className={`max-w-md w-full ${kamiTheme.cardBg} ${kamiTheme.cardBorder} rounded-xl shadow-lg p-8 border text-center space-y-6`}
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center text-red-600 dark:text-red-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Something went wrong</h2>
              <p className={`text-sm ${kamiTheme.textSecondary}`}>
                An unexpected error occurred while rendering the dashboard layout.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-900/50 text-left overflow-auto max-h-32 text-xs font-mono text-red-800 dark:text-red-300">
                {this.state.error.message}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors text-white ${kamiTheme.accentInk} ${kamiTheme.accentInkHover}`}
            >
              <RefreshCw className="w-4 h-4" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
