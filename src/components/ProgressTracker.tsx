import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const ProgressTracker: React.FC = () => {
    return (
        <ProgressContainer>
            <Title>Your Progress</Title>
            <p>Words mastered: 20</p>
            <p>Words to master: 100</p>
        </ProgressContainer>
    );
};

export default ProgressTracker;
