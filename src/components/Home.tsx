import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled(Box)`
    text-align: center;
    margin-bottom: 80%;
`;

const Title = styled(Typography)`
    font-size: 2.5rem;
    color: #333;
`;

const LinkButton = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin: 10px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`;

export default function Home() {
    return (
        <HomeContainer>
            <Title variant="h1">Welcome to Your Vocabulary Dashboard</Title>
            <Box>
                <LinkButton to="/vocabulary-lists">Go to Vocabulary Lists</LinkButton>
                <LinkButton to="/practice">Start Practice</LinkButton>
            </Box>
        </HomeContainer>
    );
}
