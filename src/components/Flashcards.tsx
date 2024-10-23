import React, { useState } from 'react';
import styled from 'styled-components';

const FlashcardContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const FlashcardBox = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Flashcards: React.FC = () => {
  const vocabItems = [
    { word: '草', definition: 'Laughing (lol)' },
    { word: 'バズる', definition: 'Something popular online' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const handleNextCard = () => {
    setShowDefinition(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabItems.length);
  };

  return (
    <FlashcardContainer>
      <Title>Flashcards</Title>
      <FlashcardBox onClick={() => setShowDefinition(!showDefinition)}>
        {showDefinition ? vocabItems[currentIndex].definition : vocabItems[currentIndex].word}
      </FlashcardBox>
      <button onClick={handleNextCard}>Next Card</button>
    </FlashcardContainer>
  );
};

export default Flashcards;
