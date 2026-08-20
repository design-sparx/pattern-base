"use client";

import { Alert } from "@mantine/core";
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
        <Alert
          color="red"
          title="Preview failed"
          icon={<IconAlertTriangle size={16} />}
          mih={120}
        >
          {this.state.error?.message ??
            "An error occurred rendering this component."}
        </Alert>
      );
    }

    return this.props.children;
  }
}
