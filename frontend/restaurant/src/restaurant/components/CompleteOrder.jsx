import React, { useState } from 'react';
import MessagingService from "../services/MessagingService";
import NavBar from "./fragments/NavBar";
import Banner from "./fragments/Banner";

const CompleteOrder = (props) => {
    const [orderStatus, setOrderStatus] = useState('');

    function sendOrder() {
        sessionStorage.setItem('order', JSON.stringify(
            {
                restaurantId: props.session.restaurant.id,
                tableNumber: props.session.tableId,
                status: 0,
                itemIDs: [
                    0, 1
                ]
            }
        ))

        setOrderStatus('Order status: processing');
        MessagingService.tryPostMessage(8083,  '/order/add', JSON.parse(sessionStorage.getItem('order'))).then(res => {
            setOrderStatus('Order status: send order');
            sessionStorage.removeItem('order');
        }).catch(() => setOrderStatus("Order status: couldn't send order"));
    }

    return (
        <>
            <NavBar session={props.session}/>
            <div className="content">
                <h1>Order Details</h1>
                <a href="javascript:void(0)" onClick={() => {sendOrder()}}>Send order</a>
                <p>{orderStatus}</p>
                <a href={"/" + props.session.restaurant.name + "/" + props.session.tableId}>Return to table</a>
            </div>
        </>
    )
}

export default CompleteOrder;