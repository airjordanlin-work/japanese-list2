import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: inherit; /* Adapt to current theme */
`;

const ToggleContainer = styled.div`
    margin-top: 20px;
`;

interface ProfileProps {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({ darkMode, setDarkMode }) => {
    return (
        <ProfileContainer>
            <Title>User Profile</Title>
            <ToggleContainer>
                <label>
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    Dark Mode
                </label>
            </ToggleContainer>
        </ProfileContainer>
    );
};

export default Profile;
