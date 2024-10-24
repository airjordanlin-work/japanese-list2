import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ConfirmationDialog from './ConfirmationDialog'; // Import the confirmation dialog component
// Define the shape of the vocab data using TypeScript interface
interface VocabItem {
    word: string;
    definition: string;
}


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

const RemoveButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
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



// Define the shape of the vocab data using TypeScript interface

// Vocabulary data
const initialVocabData: VocabItem[] = [
    { word: '風呂キャンセル界隈', definition: 'People who do not take baths' },
    { word: '草', definition: 'Grass (Japanese laugh like www so looks like grass)' },
    { word: 'くち草', definition: 'LOL' },
    { word: 'ディスる', definition: 'Diss' },
    { word: 'バズる', definition: 'Something popular online' }
];

// Styled Components (as before)

const VocabularyLists: React.FC = () => {
    const [vocabData, setVocabData] = useState<VocabItem[]>(initialVocabData);
    const [visibleDefinitions, setVisibleDefinitions] = useState<{ [key: number]: boolean }>({});
    const [newWord, setNewWord] = useState('');
    const [newDefinition, setNewDefinition] = useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [vocabToRemove, setVocabToRemove] = useState<number | null>(null);
    const [lastDeleted, setLastDeleted] = useState<VocabItem | null>(null);
    const [undoVisible, setUndoVisible] = useState(false);

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

    const handleRemoveVocab = (index: number) => {
        const removedItem = vocabData[index];
        setLastDeleted(removedItem); // Store the deleted item
        setVocabData((prev) => prev.filter((_, i) => i !== index)); // Remove the item from the list
        setUndoVisible(true); // Show undo button
        setIsDialogVisible(false);
    };

    const showConfirmationDialog = (index: number) => {
        setIsDialogVisible(true);
        setVocabToRemove(index);
    };

    const confirmRemoveVocab = () => {
        if (vocabToRemove !== null) {
            handleRemoveVocab(vocabToRemove);
            setVocabToRemove(null);
        }
    };

    const cancelRemoveVocab = () => {
        setIsDialogVisible(false);
        setVocabToRemove(null);
    };

    const handleUndo = () => {
        if (lastDeleted) {
            setVocabData((prev) => [...prev, lastDeleted]); // Restore the deleted item
            setLastDeleted(null); // Clear the last deleted item
            setUndoVisible(false); // Hide the undo button
        }
    };

    // Automatically hide the undo button after a few seconds
    useEffect(() => {
        if (undoVisible) {
            const timer = setTimeout(() => {
                setUndoVisible(false);
            }, 5000); // Hide after 5 seconds
            return () => clearTimeout(timer); // Clean up the timer
        }
    }, [undoVisible]);

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
            </InputContainer>

            <VocabListStyled>
                {vocabData.map((item, index) => (
                    <VocabItemStyled key={index} onClick={() => toggleDefinition(index)}>
                        <VocabWord>{item.word}</VocabWord>
                        <VocabDefinition isVisible={visibleDefinitions[index] || false}>
                            {item.definition}
                        </VocabDefinition>
                        <RemoveButton onClick={() => showConfirmationDialog(index)}>Remove</RemoveButton>
                    </VocabItemStyled>
                ))}
            </VocabListStyled>

            {/* Show confirmation dialog when user clicks remove */}
            {isDialogVisible && (
                <ConfirmationDialog
                    message="Are you sure you want to delete this vocabulary item?"
                    onConfirm={confirmRemoveVocab}
                    onCancel={cancelRemoveVocab}
                />
            )}

            {/* Show undo option */}
            {undoVisible && (
                <Button onClick={handleUndo}>Undo Delete</Button>
            )}
        </VocabContainer>
    );
};

export default VocabularyLists;