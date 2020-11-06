import React, { useState } from 'react';
import MessagingService from "../services/MessagingService";
import { Button } from "@material-ui/core";
import { useStateValue } from '../context/stateProvider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import OrderItem from './fragments/OrderItem';

const CompleteOrder = () => {

    const [state, dispatch] = useStateValue();

    const [message, setMessage] = useState("");

    const sendOrder = () => {
        if (state.order.length > 0) {
            setMessage("Your order has just been sent to the kitchen");
            console.log(order)
            // MessagingService.fetchHandler('POST', '/orders/', {
            //     restaurantId: state.restaurantId,
            //     tableNumber: state.tableNumber,
            //     order: order
            // }).then(() => {

            //     localStorage.removeItem('order');
            // })

            dispatch({
                type: "Clear cart"
            })

        }
        else {
            setMessage("Your order is empty")
        }

    }

    //Set quantity to the ordered items
    let counter = 0;
    let order = state.order

        //Sort them by name
        .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        //Count items with similiar names
        .map((item, index, array) => {
            let itemWithQuantity = item;
            counter++;
            if (typeof array[index + 1] === 'undefined' || item.name !== array[index + 1].name) {
                itemWithQuantity.quantity = counter;
                counter = 0;
                return itemWithQuantity;
            }
        })
        //Clear the 'undefined' objects in the order array
        .filter((item) => typeof item != 'undefined');

    let orderItemsList, orderTotalSum;

    if (order.lenght !== 0) {
        orderItemsList = order.map((item, index) => <OrderItem key={index} item={item} />)
        orderTotalSum = order.reduce(((acc, item) => acc + (item.price * item.quantity)), 0).toFixed(2);
    } else {
        orderItemsList = [];
        orderTotalSum = 0.00;
    }


    return (
        <>
            <h1>Order Details</h1>
            <div>
                <Button size="large" variant="outlined" onClick={sendOrder}>Complete Order</Button>

                {message !== '' ?
                    <ListItem>
                        <ListItemText primary={message} />
                    </ListItem>
                    : <></>}
                <List component="nav">
                    {orderItemsList}
                </List>
                <Divider />
                <ListItem>
                    <ListItemText primary={"TOTAL: €" + orderTotalSum} />
                </ListItem>
            </div>

        </>
    )
}

export default CompleteOrder;