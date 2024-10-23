import React, { useState } from 'react';
import styled from 'styled-components';

// Define the shape of the vocab data using TypeScript interface
interface VocabItem {
    word: string;
    definition: string;
}

// Vocabulary data
const initialVocabData: VocabItem[] = [
    { word: '風呂キャンセル界隈', definition: 'People who do not take baths' },
    { word: '草', definition: 'Grass (Japanese laugh like www so looks like grass)' },
    { word: 'くち草', definition: 'LOL' },
    { word: 'ディスる', definition: 'Diss' },
    { word: 'バズる', definition: 'Something popular online' }
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

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const VocabularyLists: React.FC = () => {
    const [vocabData, setVocabData] = useState<VocabItem[]>(initialVocabData);
    const [visibleDefinitions, setVisibleDefinitions] = useState<{ [key: number]: boolean }>({});
    const [newWord, setNewWord] = useState('');
    const [newDefinition, setNewDefinition] = useState('');

    const toggleDefinition = (index: number) => {
        setVisibleDefinitions((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleAddVocab = () => {
        if (newWord && newDefinition) {
            setVocabData((prev) => [...prev, { word: newWord, definition: newDefinition }]);
            setNewWord('');
            setNewDefinition('');
        }
    };

    const handleRemoveVocab = () => {
        setVocabData((prev) => prev.slice(0, -1));
    };

    return (
        <VocabContainer>
            <Title>Vocabulary Lists</Title>

            {/* Input fields for adding new vocabulary */}
            <InputContainer>
                <Input
                    type="text"
                    placeholder="Enter new word"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter new definition"
                    value={newDefinition}
                    onChange={(e) => setNewDefinition(e.target.value)}
                />
                <Button onClick={handleAddVocab}>Add Vocabulary</Button>
                <Button onClick={handleRemoveVocab}>Remove Last Vocabulary</Button>
            </InputContainer>

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

export default VocabularyLists;
