import {styled} from "styled-components";
import {Link} from "react-router-dom";

const FooterStyle = styled.footer`
    color: #fff; 
    text-align: center; 
    padding: 20px; 

    a {
        color: #00bfff; 
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;
export default function Footer()
{
    return (

        <FooterStyle>&copy; All rights reserved to Jordan Lin <Link to="https://github.com/airjordanlin-work">Credits</Link></FooterStyle>
    )
}