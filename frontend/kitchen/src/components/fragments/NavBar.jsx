import React from "react";
import '../../css/navbar.css';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
    return (
        <nav id="nav-bar">
            <h4>Hi {props.userName}! Welcome to {props.restaurantName}!</h4>

            <Link to="/login">
            <button className="btn btn-primary btn-badge"> Log In</button>
            </Link>
        </nav>
    );
};

export default NavBar;
