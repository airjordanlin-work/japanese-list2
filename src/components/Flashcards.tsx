import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button, Typography, Box } from '@mui/material';

// Keyframes for the slide animations
const slideOut = keyframes`
    0% {
        opacity: 1;
        transform: translateX(0);
    }
    100% {
        opacity: 0;
        transform: translateX(-100%);
    }
`;

const slideIn = keyframes`
    0% {
        opacity: 0;
        transform: translateX(100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

// Flashcard container styles
const FlashcardContainer = styled(Box)`
    text-align: center;
    margin-bottom: 80%;
`;

const FlashcardBox = styled(Box)<{ isFlipped: boolean; isSliding: boolean }>`
    background-color: #e0f7fa;
    color: #00695c;
    padding: 20px;
    margin: 20px auto;
    border-radius: 10px;
    cursor: pointer;
    width: 60%;
    height: 40vh;
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

    transform-style: preserve-3d;
    transition: transform 0.6s ease;
    transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};

    animation: ${({ isSliding }) => (isSliding ? slideOut : slideIn)} 0.5s ease;
`;

const FlashcardSide = styled(Box)`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    border-radius: 10px;
`;

const FlashcardFront = styled(FlashcardSide)`
    background-color: #e0f7fa;
    color: #00695c;
`;

const FlashcardBack = styled(FlashcardSide)`
    background-color: #00695c;
    color: #ffffff;
    transform: rotateY(180deg);
`;

const Title = styled(Typography)`
    font-size: 2.5rem;
    color: #00695c;
    margin-bottom: 20px;
`;

const FlashCardButton = styled(Button)`
    width: 40%;
    margin-top: 20px;
    background-color: #00695c;
    color: white;

    &:hover {
        background-color: #004d40;
    }
`;

const Flashcards: React.FC = () => {
    const vocabItems = [
        { word: '草', definition: 'Laughing (lol)' },
        { word: 'バズる', definition: 'Something popular online' }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDefinition, setShowDefinition] = useState(false);
    const [isSliding, setIsSliding] = useState(false);

    const handleNextCard = () => {
        setIsSliding(true); // Trigger slide-out animation
        setTimeout(() => {
            setShowDefinition(false); // Reset the flip
            setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabItems.length); // Move to next card
            setIsSliding(false); // Trigger slide-in animation
        }, 500); // Match the animation duration
    };

    return (
        <FlashcardContainer>
            <Title variant="h1">Flashcards</Title>
            <FlashcardBox
                isFlipped={showDefinition}
                isSliding={isSliding}
                onClick={() => setShowDefinition(!showDefinition)}
            >
                {/* Front of the card */}
                <FlashcardFront>
                    {vocabItems[currentIndex].word}
                </FlashcardFront>

                {/* Back of the card */}
                <FlashcardBack>
                    {vocabItems[currentIndex].definition}
                </FlashcardBack>
            </FlashcardBox>
            <FlashCardButton variant="contained" onClick={handleNextCard}>
                Next Card
            </FlashCardButton>
        </FlashcardContainer>
    );
};

export default Flashcards;
