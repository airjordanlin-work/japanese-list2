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

// Neon glow effect for navbar links
const neonGlow = keyframes`
    0%, 100% {
        text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 20px #00e5ff;
    }
    50% {
        text-shadow: 0 0 10px #ff4081, 0 0 20px #ff4081, 0 0 30px #ff4081;
    }
`;

// Navbar container
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
        width: 75%;
        height: 100%;
        transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
        animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.5s forwards;
        box-shadow: 5px 0 15px rgba(0, 0, 0, 0.5);
        background-color: rgba(26, 26, 29, 0.9);
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
        padding: 50px 20px;
    }
`;

// Nav item with glow effect and active state
const NavItem = styled.li`
    text-align: center;

    a {
        text-decoration: none;
        color: #b0bec5;
        font-size: 1.2rem;
        font-weight: bold;
        position: relative;
        transition: color 0.3s ease, transform 0.3s ease;

        &:hover {
            color: #ff4081;
            animation: ${neonGlow} 1.5s infinite alternate;
            transform: scale(1.1);
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
        text-shadow: 0 0 5px #ff4081, 0 0 10px #ff4081;
    }
`;

// Hamburger icon for mobile screens with glow effect
const HamburgerIcon = styled(IconButton)`
    position: fixed;
    top: 20px;
    left: 20px;
    color: #ff4081;
    z-index: 1500;
    box-shadow: 0px 0px 5px #ff4081, 0px 0px 15px #ff4081;
`;

// Main content with margin adjustment for open mobile nav
const MainContent = styled.div<{ isOpen: boolean }>`
    padding-top: 60px;
    margin-left: ${({ isOpen }) => (isOpen ? '75%' : '0')};
    transition: margin-left 0.5s ease;

    @media screen and (max-width: 750px) {
        margin-left: 0;
    }
`;

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 750);
            if (window.innerWidth > 750) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isMobile && (
                <HamburgerIcon onClick={toggleMenu}>
                    {isOpen ? <CloseIcon /> : <MenuIcon />}
                </HamburgerIcon>
            )}

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

            <MainContent isOpen={isOpen}>
                {/* Place the rest of your application components here */}
            </MainContent>
        </>
    );
};

export default NavBar;
