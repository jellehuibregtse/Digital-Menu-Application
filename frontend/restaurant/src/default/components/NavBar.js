import React, { Component } from 'react';
import '../css/navbar.css';

function loadRestaurantSettings() {
    let navItems = document.getElementById("nav-items");
    let href = window.location.href.toString();

    // todo: get restaurant nav settings (hardcoded atm)
    if(href.includes('restaurant')) {
        // adding navigation links
        // let a = document.createElement("a");
        // a.href = "/";
        // a.text = "go back";
        // navItems.appendChild(a);

        // set title and background color
        document.getElementById("nav-title").textContent = "RestaurantController Name";
        document.getElementById("nav-bar").style.backgroundColor = "var(--black)";
    }
}

class NavBar extends Component {
    render() {
        return (
            <div id="nav-bar">
                <div>
                    <div id="nav-logo"></div>
                    <a id="nav-title">Digital&nbsp;Menu&nbsp;Application</a>
                </div>
                <div id="nav-items"/>
            </div>
        )
    }
    componentDidMount() {
        loadRestaurantSettings();
    }
}

export default NavBar;