import React from 'react';
import '../css/menu.css';
import NavBar from "./fragments/NavBar";
import '../css/orderBar.css';

const Menu = (props) => {
    // Get order from session
    const order = JSON.parse(sessionStorage.getItem('order')) != null? JSON.parse(sessionStorage.getItem('order')) : [];

    // Get all menuItems from menu
    const items = props.session.menu.items.map(item => {return (
        <a href="" onClick={() => {order.push(item.id); sessionStorage.setItem('order', JSON.stringify(order));}}>{item.name}</a>
    )});

    return (
        <>
            <NavBar session={props.session}/>
            <div className="content">
                <div id="menu">
                    <h1>{props.session.menu.name}</h1>
                    <div className="item-flex">{items}</div>
                </div>
                <div id="order-bar">
                    <a href={"/" + props.session.restaurant.name + "/" + props.session.tableNumber}>Cancel</a>
                    <a href={order.length > 0? ("/" + props.session.restaurant.name + "/" + props.session.tableNumber + "/order/place") : (e) => {e.preventDefault()}}>Order {order.length > 0? "(" + order.length + ")" : null}</a>
                </div>
            </div>
        </>
    )
}

export default Menu;