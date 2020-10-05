import React, { useState } from 'react';
import MessagingService from "../services/MessagingService";
import NavBar from "./fragments/NavBar";

const CompleteOrder = (props) => {
    const [orderStatus, setOrderStatus] = useState('');

    // Get menu items in order
    let counter = 0;
    const order = JSON.parse(sessionStorage.getItem('order')) != null? JSON.parse(sessionStorage.getItem('order'))
        // Convert menu item IDs to actual menu items
        .map((itemId) => {return props.session.menu.items.find(item => item.id === itemId) })
        // Sort menu items by name
        .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        // Select unique menu items and add amount
        .map((item, i, items) => {counter++; if(typeof items[i + 1] === 'undefined' || item.name !== items[i + 1].name) {
            item['amount'] = counter;
            counter = 0
            return item;
        }})
        // Remove undefined dishes
        .filter((item) => typeof item != 'undefined'): [];

    function sendOrder() {
        setOrderStatus('Order status: processing');
        if(order.length > 0) {
            MessagingService.tryPostMessage('/orders/', {
                restaurantId: props.session.restaurantId,
                tableNumber: props.session.tableNumber,
                items: order.map((item) => { return ({ name: item.name, amount: item.amount })})
            }).then(() => {
                setOrderStatus('Order status: send order');
                sessionStorage.removeItem('order');
            }).catch(() => setOrderStatus("Order status: couldn't send order"));
        }
    }

    return (
        <>
            <NavBar session={props.session}/>
            <div className="content">
                <h1>Order Details</h1>
                <div>
                    <ul>{order.map(item => {return(<li>{item.name + " (" + item.amount + ")"}</li>)})}</ul>
                    <a href={(e) => {e.preventDefault()}} onClick={() => {sendOrder()}}>Send order</a>
                </div>
                <p>{orderStatus}</p>
                <a href={"/" + props.session.restaurant.name + "/" + props.session.tableNumber}>Return to table</a>
            </div>
        </>
    )
}

export default CompleteOrder;