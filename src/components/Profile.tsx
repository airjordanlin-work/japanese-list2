import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Profile: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <ProfileContainer>
            <Title>User Profile</Title>
            <label>
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                />
                Dark Mode
            </label>
        </ProfileContainer>
    );
};

export default Profile;
