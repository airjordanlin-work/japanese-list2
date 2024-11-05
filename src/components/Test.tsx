import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Typography, TextField } from '@mui/material';
import ProgressTracker from './ProgressTracker';

// Define the structure of a vocabulary item
interface VocabItem {
    word: string;
    definition: string;
}

// Initial vocabulary data
const vocabList: VocabItem[] = [
    { word: '風呂キャンセル界隈', definition: 'People who do not take baths' },
    { word: '草', definition: 'Grass (Japanese laugh like www so looks like grass)' },
    { word: 'くち草', definition: 'LOL' },
    { word: 'ディスる', definition: 'Diss' },
    { word: 'バズる', definition: 'Something popular online' }
];

// Styled component for the test container
const TestContainer = styled(Box)`
    text-align: center;
    margin-top: 50px;
    padding: 20px;
`;

// Vocabulary Test Component
const Test: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [learnedCount, setLearnedCount] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);

    // Function to handle user answer
    const handleCheckAnswer = () => {
        const currentWord = vocabList[currentIndex];
        if (userAnswer.trim().toLowerCase() === currentWord.definition.toLowerCase()) {
            setLearnedCount(learnedCount + 1);
            setFeedback('Correct!');
        } else {
            setFeedback('Incorrect. Try the next one.');
        }
        setUserAnswer('');
        setCurrentIndex((currentIndex + 1) % vocabList.length); // Move to next word
    };

    return (
        <TestContainer>
            <Typography variant="h3">Vocabulary Test</Typography>
            <Typography variant="h5" sx={{ marginTop: '20px', marginBottom: '10px' }}>
                What does "{vocabList[currentIndex].word}" mean?
            </Typography>
            <TextField
                variant="outlined"
                label="Your Answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                sx={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleCheckAnswer} sx={{ marginBottom: '20px' }}>
                Submit
            </Button>
            {feedback && (
                <Typography variant="body1" color={feedback === 'Correct!' ? 'green' : 'red'}>
                    {feedback}
                </Typography>
            )}
            <ProgressTracker learnedCount={learnedCount} totalWords={vocabList.length} />
        </TestContainer>
    );
};

export default Test;
