import React, {Component} from 'react';
import '../css/menu.css';

function loadRestaurantSettings() {
    // todo: get categories from menu (hardcoded atm)
    let menu = ["appetizers", "fish", "meat", "dessert", "cool-drinks", "warm-drinks"];
    let categories = document.getElementById("categories");
    menu.forEach(category => {
        let item = document.createElement("a");
        item.textContent = category;
        item.href = "/restaurant-name/6/order/" + category;
        categories.appendChild(item);
    });
}

class OrderMenu extends Component {
    render() {
        return (
            <div id="menu">
                <h1>Menu</h1>
                <div id="categories" className="item-flex"/>
            </div>
        )
    }
    componentDidMount() {
        loadRestaurantSettings();
    }
}

export default OrderMenu;