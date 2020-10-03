import React from "react";
import '../../css/navbar.css';

const NavBar = (props) => {
    return (
        <nav id="nav-bar">
            <a className="navbar-brand" href="#">Orders</a>

            <a className="navbar-brand" href="#">
                <h4>Hi {props.userName}! Welcome to {props.restaurantName}!</h4>
            </a>
            <button className="btn btn-primary btn-badge" style={{"margin-right": "5px"}}> Log In</button>
        </nav>
    );
};

export default NavBar;
