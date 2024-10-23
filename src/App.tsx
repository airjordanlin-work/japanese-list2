import React, { useState } from 'react';
import styled from 'styled-components';

// Define the shape of the vocab data using TypeScript interface
interface VocabItem {
  word: string;
  definition: string;
}

// Vocabulary data
const vocabData: VocabItem[] = [
  { word: '風呂キャンセル界隈', definition: 'People who do not take baths' },
  { word: 'Ephemeral', definition: 'Lasting for a very short time.' },
  { word: 'Ineffable', definition: 'Too great or extreme to be expressed in words.' },
  { word: 'Serendipity', definition: 'The occurrence of events by chance in a happy or beneficial way.' },
  { word: 'Quintessential', definition: 'Representing the most perfect or typical example of a quality or class.' }
];

// Styled Components with Hover and Animation effects
const VocabContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const VocabListStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const VocabItemStyled = styled.li`
  margin: 15px 0;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    background-color: #e0e0e0;
  }
`;

const VocabWord = styled.div`
  font-size: 1.5rem;
  color: #000;
  font-weight: bold;
`;

const VocabDefinition = styled.p<{ isVisible: boolean }>`
  color: #555;
  font-size: 1.2rem;
  margin-top: 10px;
  max-height: ${({ isVisible }) => (isVisible ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

// VocabList Component
const VocabList: React.FC = () => {
  const [visibleDefinitions, setVisibleDefinitions] = useState<{ [key: number]: boolean }>({});

  const toggleDefinition = (index: number) => {
    setVisibleDefinitions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <VocabContainer>
      <Title>Vocabulary List</Title>
      <VocabListStyled>
        {vocabData.map((item, index) => (
          <VocabItemStyled key={index} onClick={() => toggleDefinition(index)}>
            <VocabWord>{item.word}</VocabWord>
            <VocabDefinition isVisible={visibleDefinitions[index] || false}>
              {item.definition}
            </VocabDefinition>
          </VocabItemStyled>
        ))}
      </VocabListStyled>
    </VocabContainer>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <VocabList />
    </div>
  );
};

export default App;
