import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Slide-in animation for the navbar
const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

// Slide-out animation for closing the navbar
const slideOut = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
`;

// Navbar container that takes full height and slides out from the left side
const NavbarContainer = styled.nav<{ isOpen: boolean }>`
    background-color: #333;
    position: absolute;
    top: 9%;
    left: 0;
    width: 16%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.5s forwards;
    transition: transform 0.5s ease;

    @media screen and (max-width: 750px) {
        position: relative;
        right: 0;
        width: 100%;
        padding: 2% 1%;
        margin-top: 9%;
    }
`;

// Nav list items with display control for mobile and desktop views
const NavList = styled.ul<{ isOpen: boolean }>`
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;

    @media screen and (max-width: 750px) {
        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }
`;

// Individual NavItem with active styling and hover effects
const NavItem = styled.li`
    padding: 30px 20px;

    a {
        text-decoration: none;
        color: #fff;
        font-size: 1.2rem;

        &:hover {
            color: #ff6347; /* Change color on hover */
            text-decoration: underline;
        }
    }

    &.active a {
        color: #ff6347; /* Active link color */
        font-weight: bold;
    }

    @media screen and (max-width: 750px) {
        padding: 15px 10px;
        text-align: center;
    }
`;

// Hamburger icon for both large and small screens
const HamburgerIcon = styled.div`
    cursor: pointer;
    padding: 10px;
    position: absolute;
    top: 10px; /* Adjusted to ensure it's below the header */
    right: 20px;
    z-index: 1000;

    div {
        width: 30px;
        height: 4px;
        background-color: #fff;
        margin: 6px 0;
    }

    @media screen and (max-width: 750px) {
        margin-right: 10px;
    }
`;



const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle menu visibility
    const location = useLocation(); // Track current location for active state

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>


            {/* Hamburger icon visible at all times */}
            <HamburgerIcon onClick={toggleMenu}>
                <div />
                <div />
                <div />
            </HamburgerIcon>

            {/* Navbar container */}
            <NavbarContainer isOpen={isOpen}>
                <NavList isOpen={isOpen}>
                    <NavItem className={location.pathname === '/' ? 'active' : ''}>
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/vocabulary-lists' ? 'active' : ''}>
                        <Link to="/vocabulary-lists">Vocabulary Lists</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/practice' ? 'active' : ''}>
                        <Link to="/practice">Practice</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/games' ? 'active' : ''}>
                        <Link to="/games">Games</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/progress-tracker' ? 'active' : ''}>
                        <Link to="/progress-tracker">Progress Tracker</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/profile' ? 'active' : ''}>
                        <Link to="/profile">Profile</Link>
                    </NavItem>
                </NavList>
            </NavbarContainer>

        </>
    );
};

export default NavBar;
