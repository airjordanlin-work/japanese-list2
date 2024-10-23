
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const LinkButton = styled(Link)`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

export default function Home(){
  return (
    <HomeContainer>
      <Title>Welcome to Your Vocabulary Dashboard</Title>
      <div>
        <LinkButton to="/vocabulary-lists">Go to Vocabulary Lists</LinkButton>
        <LinkButton to="/practice">Start Practice</LinkButton>
      </div>
    </HomeContainer>
  );
};


