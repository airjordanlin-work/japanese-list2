import React, { useState } from 'react';
import styled from 'styled-components';
import { VocabularyEntry, searchWord } from '../utils/xmlParser';
import { Button, ToggleButton, ToggleButtonGroup, TextField, Typography, Paper, Box } from '@mui/material';

// Styled components
const DictionaryContainer = styled(Paper)`
    width: 80%;
    max-width: 800px;
    margin-bottom: 80%;
    margin-left: 30%;

    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    background-color: #f3f4f6;
`;

const Title = styled(Typography)`
    text-align: center;
    color: #1a237e;
    font-weight: bold;
`;

const ResultContainer = styled.div`
    margin-top: 20px;
`;

const ResultItem = styled(Paper)`
    background-color: #e8eaf6;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
`;

const ResultWord = styled(Typography)`
    font-size: 1.5rem;
    font-weight: bold;
    color: #3949ab;
`;

const DefinitionBox = styled(Box)`
    background-color: #f1f8e9;
    padding: 10px;
    margin-top: 8px;
    border-radius: 5px;
    font-size: 1.1rem;
    color: #1b5e20;
`;

const Romaji = styled(Typography)`
    color: #78909c;
    font-size: 1rem;
    margin-top: 5px;
`;

const Dictionary: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<VocabularyEntry[]>([]);
    const [translationMode, setTranslationMode] = useState<'JAtoEN' | 'ENtoJA'>('JAtoEN');

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            const searchResults = await searchWord(searchTerm.trim());
            setResults(searchResults);
        }
    };

    const handleModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newMode: 'JAtoEN' | 'ENtoJA'
    ) => {
        if (newMode) {
            setTranslationMode(newMode);
            setResults([]);
            setSearchTerm('');
        }
    };

    return (
        <DictionaryContainer>
            <Title variant="h4">Dictionary</Title>
            <ToggleButtonGroup
                value={translationMode}
                exclusive
                onChange={handleModeChange}
                aria-label="translation mode"
                style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
            >
                <ToggleButton value="JAtoEN" aria-label="Japanese to English">
                    Japanese to English
                </ToggleButton>
                <ToggleButton value="ENtoJA" aria-label="English to Japanese">
                    English to Japanese
                </ToggleButton>
            </ToggleButtonGroup>
            <TextField
                label="Type a word to translate"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={{ margin: '10px 0' }}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
                style={{ marginTop: '10px' }}
            >
                Search
            </Button>
            <ResultContainer>
                {results.length > 0 ? (
                    <ResultItem elevation={2}>
                        <ResultWord variant="h6">{searchTerm}</ResultWord>
                        {results.map((entry, index) => (
                            <DefinitionBox key={index}>
                                {translationMode === 'JAtoEN' ? (
                                    <>
                                        <Typography variant="h6">{entry.meanings.join(', ')}</Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h6">{entry.kanji || entry.reading}</Typography>
                                        <Romaji>{entry.romaji}</Romaji>
                                    </>
                                )}
                            </DefinitionBox>
                        ))}
                    </ResultItem>
                ) : (
                    searchTerm && (
                        <Typography variant="body1" color="textSecondary">
                            No results found for "{searchTerm}"
                        </Typography>
                    )
                )}
            </ResultContainer>
        </DictionaryContainer>
    );
};

export default Dictionary;
