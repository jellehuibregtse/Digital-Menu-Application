import React, { useState } from 'react';
import MessagingService from "../services/MessagingService";
import NavBar from "./fragments/NavBar";
import Banner from "./fragments/Banner";

const CompleteOrder = (props) => {
    const [orderStatus, setOrderStatus] = useState('');

    function sendOrder() {
        sessionStorage.setItem('order', JSON.stringify(
            {
                restaurantId: 0,
                tableNumber: 0,
                status: 0,
                menuItems: [
                    {
                        name: "Test",
                        status: 0
                    }
                ]
            }
        ))

        setOrderStatus('Order status: processing');
        MessagingService.tryPostMessage(8083,  '/orders/', JSON.parse(sessionStorage.getItem('order'))).then(res => {
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