import React, {useState} from 'react';
import '../css/menu.css';
import '../css/orderBar.css';
import {Button} from "@material-ui/core";

const Menu = (props) => {
    // Get order from session
    const [order, setOrder] = useState(JSON.parse(sessionStorage.getItem('order')) != null? JSON.parse(sessionStorage.getItem('order')) : []);

    // Get all menuItems from menu
    const items = typeof props.session.menu !== 'undefined'? props.session.menu.items.map(item => {return (
        <Button onClick={() => {
            let o = JSON.parse(sessionStorage.getItem('order')) != null? JSON.parse(sessionStorage.getItem('order')) : [];
            o.push(item.id);
            sessionStorage.setItem('order', JSON.stringify(o));
            setOrder(o);
        }}>{item.name}</Button>
    )}) : null;

    return (
        <>
            <div id="menu">
                <h1>{typeof props.session.menu !== 'undefined'? props.session.menu.name : null}</h1>
                <div className="item-flex">{items}</div>
            </div>
            {order.length > 0? <div className="complete-order"><a href={"/" + props.session.restaurant.name + "/" + props.session.tableNumber + "/order/place"}>Order ({order.length})</a></div> : null}
        </>
    )
}

export default Menu;