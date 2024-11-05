import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// Define the shape of the vocab data using TypeScript interface
interface VocabItem {
    word: string;
    definition: string;
}

// Styled Components with MUI and styled-components
const VocabContainer = styled(Box)`
    width: 80%;
    max-width: 800px;
    margin: 20px auto;
    background-color: #fafafa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const VocabListStyled = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const VocabItemStyled = styled(Box)`
    margin: 15px 0;
    background-color: #e3f2fd;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s, background-color 0.3s;

    &:hover {
        transform: translateY(-5px);
        background-color: #bbdefb;
    }
`;

const VocabWord = styled(Typography)`
    font-size: 1.5rem;
    font-weight: bold;
    color: #1976d2;
`;

const VocabDefinition = styled(Typography)<{ isVisible: boolean }>`
    color: #424242;
    font-size: 1.1rem;
    margin-top: 10px;
    max-height: ${({ isVisible }) => (isVisible ? '200px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease;
`;

const InputContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const RemoveButton = styled(Button)`
    background-color: #f44336;
    color: white;
    margin-top: 10px;

    &:hover {
        background-color: #d32f2f;
    }
`;

// Vocabulary data
const initialVocabData: VocabItem[] = [
    { word: '風呂キャンセル界隈', definition: 'People who do not take baths' },
    { word: '草', definition: 'Grass (Japanese laugh like www so looks like grass)' },
    { word: 'くち草', definition: 'LOL' },
    { word: 'ディスる', definition: 'Diss' },
    { word: 'バズる', definition: 'Something popular online' }
];

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
        setLastDeleted(removedItem);
        setVocabData((prev) => prev.filter((_, i) => i !== index));
        setUndoVisible(true);
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
            setVocabData((prev) => [...prev, lastDeleted]);
            setLastDeleted(null);
            setUndoVisible(false);
        }
    };

    useEffect(() => {
        if (undoVisible) {
            const timer = setTimeout(() => setUndoVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [undoVisible]);

    return (
        <VocabContainer>
            <Typography variant="h4" align="center" gutterBottom>Vocabulary Lists</Typography>

            <InputContainer>
                <TextField
                    label="New Word"
                    variant="outlined"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    margin="dense"
                />
                <TextField
                    label="New Definition"
                    variant="outlined"
                    value={newDefinition}
                    onChange={(e) => setNewDefinition(e.target.value)}
                    margin="dense"
                />
                <Button variant="contained" color="primary" onClick={handleAddVocab} style={{ marginTop: '10px' }}>
                    Add Vocabulary
                </Button>
            </InputContainer>

            <VocabListStyled>
                {vocabData.map((item, index) => (
                    <VocabItemStyled key={index} onClick={() => toggleDefinition(index)}>
                        <VocabWord>{item.word}</VocabWord>
                        <VocabDefinition isVisible={visibleDefinitions[index] || false}>
                            {item.definition}
                        </VocabDefinition>
                        <RemoveButton onClick={() => showConfirmationDialog(index)} variant="contained">
                            Remove
                        </RemoveButton>
                    </VocabItemStyled>
                ))}
            </VocabListStyled>

            <Dialog open={isDialogVisible} onClose={cancelRemoveVocab}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this vocabulary item?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelRemoveVocab} color="primary">Cancel</Button>
                    <Button onClick={confirmRemoveVocab} color="secondary">Confirm</Button>
                </DialogActions>
            </Dialog>

            {undoVisible && (
                <Button onClick={handleUndo} variant="outlined" color="secondary" style={{ marginTop: '10px' }}>
                    Undo Delete
                </Button>
            )}
        </VocabContainer>
    );
};

export default VocabularyLists;
