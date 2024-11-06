import { createBrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';
import { Paper, Typography, Container, Button } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './components/Home';
import VocabularyLists from './components/VocabularyLists';
import Practice from './components/Practice';
import Games from './components/Games';
import ProgressTracker from './components/ProgressTracker';
import Profile from './components/Profile';
import Flashcards from "./components/Flashcards.tsx";
import Dictionary from "./components/Dictionary.tsx";
import Test from "./components/Test.tsx";


// Background with a cosmic image overlayed with gradient
const AppPage = styled.div`
    width: 105%;
    right: 2%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url('/space-background.jpg') no-repeat center center fixed;
    background-size: cover;
    color: #ffffff;
    overflow: hidden;
    position: relative;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(11, 13, 26, 0.85); /* Dark overlay for readability */
        background: radial-gradient(circle, rgba(11, 13, 26, 0.9), rgba(26, 31, 46, 0.8));
    }
`;

const ContentWrapper = styled(Container)`
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    background: rgba(29, 32, 53, 0.9);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    position: relative;
    z-index: 1; /* Ensures it stays above the background */
`;

const StyledHeader = styled(Typography)`
    color: #00e5ff;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    font-size: 2rem;
    text-shadow: 0px 0px 5px #00e5ff;
`;

const StyledPaper = styled(Paper)`
    padding: 20px;
    margin: 10px 0;
    background: linear-gradient(145deg, #23253d, #2e3150);
    border: 1px solid #374151;
    border-radius: 8px;
    color: #e0f7fa;
    transition: transform 0.2s;
    box-shadow: 0px 4px 15px rgba(0, 229, 255, 0.2);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 8px 20px rgba(0, 229, 255, 0.3);
    }
`;

const StyledButton = styled(Button)`
    background-color: #ff4081;
    color: white;
    font-weight: bold;
    margin-top: 20px;
    text-shadow: 0px 0px 5px #ff4081;
    box-shadow: 0px 4px 10px rgba(255, 64, 129, 0.3);

    &:hover {
        background-color: #ff80ab;
    }
`;

// Root component with routes and navigation
const Root = () => {
    return (
        <AppPage>
            <ContentWrapper>
                <Navbar />
                <StyledHeader variant="h4">Welcome to the Galactic Learning Hub</StyledHeader>

                <Routes>
                    <Route path="/" element={<StyledPaper><Home /></StyledPaper>} />
                    <Route path="/vocabulary-lists" element={<StyledPaper><VocabularyLists /></StyledPaper>} />
                    <Route path="/practice" element={<StyledPaper><Practice /></StyledPaper>} />
                    <Route path="/games" element={<StyledPaper><Games /></StyledPaper>} />
                    <Route path="/progress-tracker" element={<StyledPaper><ProgressTracker /></StyledPaper>} />
                    <Route path="/profile" element={<StyledPaper><Profile /></StyledPaper>} />
                    <Route path="/flashcards" element={<StyledPaper><Flashcards /></StyledPaper>} />
                    <Route path="/dictionary" element={<StyledPaper><Dictionary /></StyledPaper>} />
                    <Route path="/tests" element={<StyledPaper><Test /></StyledPaper>} />
                </Routes>
                <StyledButton variant="contained">Embark on Your Learning Journey</StyledButton>
            </ContentWrapper>
        </AppPage>
    );
}

// Create the router using createBrowserRouter and pass it to RouterProvider
const router = createBrowserRouter([{ path: "*", Component: Root }]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
