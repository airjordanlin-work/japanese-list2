import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PracticeContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const PracticeButton = styled(Link)`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const Practice: React.FC = () => {
    return (
        <PracticeContainer>
            <Title>Choose a Practice Activity</Title>
            <PracticeButton to="/flashcards">Flashcards</PracticeButton>
            <PracticeButton to="/quizzes">Quizzes</PracticeButton>
        </PracticeContainer>
    );
};

export default Practice;
