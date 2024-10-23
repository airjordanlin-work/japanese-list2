import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Navbar container that takes full height and sticks to the left side
const NavbarContainer = styled.nav`
    background-color: #333;
    position: absolute;
    top: 15%; /* Adjust this to be directly under the header */
    left: 0;
    width: 15%; /* Adjust width as needed */
    height: 100%; /* Take up the remaining height of the screen */
    display: flex;
    flex-direction: column; /* Display links in a column */
    padding-top: 20px; /* Add padding to separate links from top */
    z-index: 1;
`;

// NavList with flex layout to make items stack vertically
const NavList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Start from the top */
`;

// Individual NavItem with active styling and hover effects
const NavItem = styled.li`
    padding: 10px 20px;

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
`;

const NavBar = () => {
    const location = useLocation(); // Track current location for active state

    return (
        <NavbarContainer>
            <NavList>
                <NavItem className={location.pathname === "/" ? "active" : ""}>
                    <Link to="/">Home</Link>
                </NavItem>
                <NavItem className={location.pathname === "/vocabulary-lists" ? "active" : ""}>
                    <Link to="/vocabulary-lists">Vocabulary Lists</Link>
                </NavItem>
                <NavItem className={location.pathname === "/practice" ? "active" : ""}>
                    <Link to="/practice">Practice</Link>
                </NavItem>
                <NavItem className={location.pathname === "/games" ? "active" : ""}>
                    <Link to="/games">Games</Link>
                </NavItem>
                <NavItem className={location.pathname === "/progress-tracker" ? "active" : ""}>
                    <Link to="/progress-tracker">Progress Tracker</Link>
                </NavItem>
                <NavItem className={location.pathname === "/profile" ? "active" : ""}>
                    <Link to="/profile">Profile</Link>
                </NavItem>
            </NavList>
        </NavbarContainer>
    );
};

export default NavBar;
