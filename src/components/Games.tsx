
import styled from 'styled-components';

const GamesContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export default function Games(){
  return (
    <GamesContainer>
      <Title>Vocabulary Games</Title>
      <p>Interactive games coming soon!</p>
    </GamesContainer>
  );
};


