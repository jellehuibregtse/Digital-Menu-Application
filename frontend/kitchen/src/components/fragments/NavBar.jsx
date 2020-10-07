import React from "react";
import '../../css/navbar.css';

const NavBar = (props) => {
    return (
        <nav id="nav-bar">
            <div>
                {/*<a className="navbar-brand" href="#">Orders</a>*/}
            </div>

            <h4>Hi {props.userName}! Welcome to {props.restaurantName}!</h4>

            <button className="btn btn-primary btn-badge"> Log In</button>
        </nav>
    );
};

export default NavBar;
