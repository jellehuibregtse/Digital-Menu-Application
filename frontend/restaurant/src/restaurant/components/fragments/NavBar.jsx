import React from 'react';
import '../../css/navbar.css';

const NavBar = (props) => {
    const navItems = [];

    return (
        <div id="nav-bar">
            <div><img src={props.session.restaurant.logoURL}/></div>
            <h4>Welcome to {props.session.restaurant.name}!</h4>
            <div id="nav-items">{navItems}</div>
        </div>
    )
}

export default NavBar;