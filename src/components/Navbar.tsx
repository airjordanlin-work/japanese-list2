import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Slide-in animation for mobile navbar
const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

// Slide-out animation for closing the mobile navbar
const slideOut = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
`;

// Navbar container for full screen
const NavbarContainer = styled.nav<{ isOpen: boolean }>`
    background-color: #1a1a1d;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: auto;

    @media screen and (max-width: 750px) {
        flex-direction: column;
        align-items: flex-start;
        position: fixed;
        top: 0;
        left: 0;
        width: 75%; /* Only occupy 75% of the screen on mobile */
        height: 100%;
        transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
        animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.5s forwards;
        box-shadow: 5px 0 15px rgba(0, 0, 0, 0.5);
        background-color: #1a1a1d;
    }
`;

// Nav list items
const NavList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 20px;

    @media screen and (max-width: 750px) {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        padding: 50px 20px; /* Adds padding for spacing on mobile */
    }
`;

// Individual NavItem with active styling, glow effect, and hover effects
const NavItem = styled.li`
    text-align: center;

    a {
        text-decoration: none;
        color: #b0bec5;
        font-size: 1.2rem;
        font-weight: bold;
        position: relative;
        transition: color 0.3s ease;

        &:hover {
            color: #ff4081;
        }

        &:hover::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -4px;
            height: 2px;
            background: #ff4081;
            box-shadow: 0 0 10px #ff4081, 0 0 20px #ff4081;
        }
    }

    &.active a {
        color: #ff4081;
        font-weight: bold;
    }
`;

// Hamburger icon for mobile screens
const HamburgerIcon = styled(IconButton)`
    position: fixed;
    top: 20px;
    left: 20px;
    color: #ff4081;
    z-index: 1500;
`;

const MainContent = styled.div<{ isOpen: boolean }>`
    padding-top: 60px; /* Space for the fixed navbar */
    margin-left: ${({ isOpen }) => (isOpen ? '75%' : '0')};
    transition: margin-left 0.5s ease;

    @media screen and (max-width: 750px) {
        margin-left: 0; /* Reset for mobile */
    }
`;

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle menu visibility
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);
    const location = useLocation(); // Track current location for active state

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Handler to update `isMobile` state on window resize
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 750);
            if (window.innerWidth > 750) {
                setIsOpen(false); // Close menu on larger screens
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Conditionally render Hamburger icon for mobile view */}
            {isMobile && (
                <HamburgerIcon onClick={toggleMenu}>
                    {isOpen ? <CloseIcon /> : <MenuIcon />}
                </HamburgerIcon>
            )}

            {/* Navbar container */}
            <NavbarContainer isOpen={isOpen}>
                <NavList>
                    <NavItem className={location.pathname === '/' ? 'active' : ''}>
                        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/vocabulary-lists' ? 'active' : ''}>
                        <Link to="/vocabulary-lists" onClick={() => setIsOpen(false)}>Vocabulary Lists</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/practice' ? 'active' : ''}>
                        <Link to="/practice" onClick={() => setIsOpen(false)}>Practice</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/games' ? 'active' : ''}>
                        <Link to="/games" onClick={() => setIsOpen(false)}>Games</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/progress-tracker' ? 'active' : ''}>
                        <Link to="/progress-tracker" onClick={() => setIsOpen(false)}>Progress Tracker</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/profile' ? 'active' : ''}>
                        <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                    </NavItem>
                    <NavItem className={location.pathname === '/dictionary' ? 'active' : ''}>
                        <Link to="/dictionary" onClick={() => setIsOpen(false)}>Dictionary</Link>
                    </NavItem>
                </NavList>
            </NavbarContainer>

            {/* Main content with padding for navbar */}
            <MainContent isOpen={isOpen}>
                {/* Place the rest of your application components here */}
            </MainContent>
        </>
    );
};

export default NavBar;
