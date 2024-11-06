import React, { useState } from 'react';
import styled from 'styled-components';
import { VocabularyEntry, searchWord } from '../utils/xmlParser';
import { Button, ToggleButton, ToggleButtonGroup, TextField, Typography, Paper, Box } from '@mui/material';

// Styled components with space theme
const DictionaryContainer = styled(Paper)`
    width: 80%;
    max-width: 600px;
    margin: auto;
    padding: 30px;
    border-radius: 12px;
    background-color: rgba(29, 32, 53, 0.9); /* Dark background for space feel */
    box-shadow: 0px 4px 20px rgba(0, 229, 255, 0.2);
`;

const Title = styled(Typography)`
    text-align: center;
    color: #00e5ff;
    font-weight: bold;
    font-size: 1.8rem;
    text-shadow: 0px 0px 5px #00e5ff;
`;

const ResultContainer = styled.div`
    margin-top: 20px;
`;

const ResultItem = styled(Paper)`
    background: linear-gradient(145deg, #23253d, #2e3150);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 15px;
    color: #e0f7fa;
    box-shadow: 0px 4px 15px rgba(0, 229, 255, 0.2);
`;

const ResultWord = styled(Typography)`
    font-size: 1.5rem;
    font-weight: bold;
    color: #00e5ff;
    text-shadow: 0px 0px 5px #00e5ff;
`;

const DefinitionBox = styled(Box)`
    background-color: rgba(33, 48, 58, 0.8);
    padding: 10px;
    margin-top: 8px;
    border-radius: 5px;
    font-size: 1.1rem;
    color: #81c784;
`;

const Romaji = styled(Typography)`
    color: #b0bec5;
    font-size: 1rem;
    margin-top: 5px;
`;

const StyledButton = styled(Button)`
    background-color: #ff4081;
    color: white;
    font-weight: bold;
    text-shadow: 0px 0px 5px #ff4081;
    box-shadow: 0px 4px 10px rgba(255, 64, 129, 0.3);

    &:hover {
        background-color: #ff80ab;
    }
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

    const handleModeChange = (newMode: 'JAtoEN' | 'ENtoJA') => {
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
                onChange={(_, newMode) => handleModeChange(newMode)}
                aria-label="translation mode"
                style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
            >
                <ToggleButton value="JAtoEN" aria-label="Japanese to English" style={{ color: '#00e5ff' }}>
                    Japanese to English
                </ToggleButton>
                <ToggleButton value="ENtoJA" aria-label="English to Japanese" style={{ color: '#00e5ff' }}>
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
                style={{
                    margin: '10px 0',
                    backgroundColor: '#1e1e30',
                    color: '#e0f7fa',
                    borderRadius: '5px',
                }}
                InputLabelProps={{
                    style: { color: '#b0bec5' },
                }}
                InputProps={{
                    style: { color: '#e0f7fa' },
                }}
            />
            <StyledButton
                variant="contained"
                fullWidth
                onClick={handleSearch}
                style={{ marginTop: '10px' }}
            >
                Search
            </StyledButton>
            <ResultContainer>
                {results.length > 0 ? (
                    <ResultItem elevation={2}>
                        <ResultWord variant="h6">{searchTerm}</ResultWord>
                        {results.map((entry, index) => (
                            <DefinitionBox key={index}>
                                {translationMode === 'JAtoEN' ? (
                                    <Typography variant="h6">{entry.meanings.join(', ')}</Typography>
                                ) : (
                                    <>
                                        <Typography variant="h6">{entry.kanji || entry.reading}</Typography>
                                        {entry.romaji && <Romaji>{entry.romaji}</Romaji>}
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
