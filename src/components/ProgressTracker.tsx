import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';

interface ProgressTrackerProps {
    learnedCount: number;
    totalWords: number;
}

// Styled component for the container
const ProgressContainer = styled(Box)`
    text-align: center;
    margin-top: 30px;
    padding: 20px;
    background-color: #e3f2fd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// Progress Tracker Component
const ProgressTracker: React.FC<ProgressTrackerProps> = ({ learnedCount, totalWords }) => {
    return (
        <ProgressContainer>
            <Typography variant="h4">Your Progress</Typography>
            <Typography variant="body1">Words mastered: {learnedCount}</Typography>
            <Typography variant="body1">Words to master: {totalWords - learnedCount}</Typography>
        </ProgressContainer>
    );
};

export default ProgressTracker;
