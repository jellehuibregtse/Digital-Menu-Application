import React from "react";
import '../../css/navbar.css';
import {Link} from 'react-router-dom';
import styled from 'styled-components'

const WelcomeText = styled.p`
    margin-left: 2vw;
    margin: auto;
    

`



const NavBar = (props) => {
    return (
        
        <nav id="nav-bar" style = {{backgroundColor : "#ffaf20"}}>
            <WelcomeText>
            <h4>Hi 
             {props.userName ? " " + props.userName : " {placeholder-user-name}"}!
             Welcome to 
             {props.restaurantName ? props.restaurantName : " {placeholder-restaurant-name}"}!</h4>
            </WelcomeText>
            <Link to="/login">
            <button className="btn btn-primary btn-badge btn-md" 
            style={
                {width: "10vw",
                maxWidth: "100px"}
                }> Log In</button>
            </Link>
        </nav>
        
    );
};

export default NavBar;
