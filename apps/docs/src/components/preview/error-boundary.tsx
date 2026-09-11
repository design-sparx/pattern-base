"use client";

import { IconAlertTriangle } from "@tabler/icons-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  patternId?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class PreviewErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(
      `Preview error [${this.props.patternId ?? "unknown"}]:`,
      error,
      errorInfo,
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex items-center gap-3">
            <IconAlertTriangle
              size={20}
              className="text-red-600 dark:text-red-400"
            />
            <div>
              <p className="font-medium text-red-800 dark:text-red-300">
                Preview failed
              </p>
              <p className="text-sm text-red-600 dark:text-red-400">
                {this.state.error?.message ??
                  "An error occurred rendering this component."}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
