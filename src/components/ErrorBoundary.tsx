import React, { Component, ReactNode } from 'react';
import { Typography, Button, Box } from '@mui/material';

interface ErrorBoundaryProps {
    children?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    handleReload = () => {
        this.setState({ hasError: false });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                    textAlign="center"
                    bgcolor="#f8d7da"
                    p={3}
                    borderRadius={1}
                >
                    <Typography variant="h4" color="error" gutterBottom>
                        Oops! Something went wrong.
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        An unexpected error has occurred. Please try refreshing the page, or contact support if the problem persists.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleReload}
                        sx={{ mt: 2 }}
                    >
                        Reload Page
                    </Button>
                </Box>
            );
        }

        // Render children if no error has occurred
        return this.props.children ?? null;
    }
}

export default ErrorBoundary;
