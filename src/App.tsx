
import { createBrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './components/Navbar';
import Home from './components/Home';
import VocabularyLists from './components/VocabularyLists';
import Practice from './components/Practice';
import Games from './components/Games';
import ProgressTracker from './components/ProgressTracker';
import Profile from './components/Profile';
import Flashcards from "./components/Flashcards.tsx";
import Dictionary from "./components/Dictionary.tsx"
import Test from "./components/Test.tsx"

const AppPage = styled.div`
    width: 105%;
    min-height: 200vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: lightblue;
`;

const ContentWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

// Root component with routes and navigation
const Root = () => {
    return (
        <AppPage>
            <ContentWrapper>

                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/vocabulary-lists" element={<VocabularyLists />} />
                    <Route path="/practice" element={<Practice />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/progress-tracker" element={<ProgressTracker />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/flashcards" element={<Flashcards />} />
                    <Route path="/dictionary" element={<Dictionary />} />
                    <Route path="/tests" element={<Test />} />
                </Routes>
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
