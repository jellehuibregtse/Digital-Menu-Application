import React, { useState } from 'react';
import MessagingService from "../services/MessagingService";
import { Button } from "@material-ui/core";
import { useStateValue } from '../context/stateProvider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import OrderItem from './fragments/OrderItem';

const CompleteOrder = (props) => {

    const [state, update] = useStateValue();

    const sendOrder = () => {
        console.log(order)
    }

    // function sendOrder() {
    //     if(order.length > 0) {
    //         setOrderStatus('Order status: processing');
    //         MessagingService.fetchHandler('POST','/orders/', {
    //             restaurantId: props.session.restaurantId,
    //             tableNumber: props.session.tableNumber,
    //             items: order.map((item) => { return ({ name: item.name, amount: item.amount })})
    //         }).then(() => {
    //             setOrderStatus('Order status: send order');
    //             sessionStorage.removeItem('order');
    //             setOrder([]);
    //         }).catch(() => setOrderStatus("Order status: couldn't send order"));
    //     }
    // }

    let counter = 0;
    let order = state.order
    .sort((a,b)=>(a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    .map((item,index,array)=>{
        let itemWithQuantity = item;
        counter++;
        if(typeof array[index + 1] === 'undefined' || item.name!==array[index+1].name){
            itemWithQuantity.quantity=counter;
            counter=0;
            return itemWithQuantity;
        } 
    })
    .filter((item) => typeof item != 'undefined');

    console.log(order)
    console.log(state.order)
    let orderItemsList, orderTotalSum;

    if (order.lenght !== 0) {
        orderItemsList = order.map((item, index) => <OrderItem key={index} item={item} />)
        orderTotalSum = order.reduce(((acc, item) => acc + (item.price*item.quantity)), 0).toFixed(2);
    } else {
        orderItemsList = [];
        orderTotalSum = 0.00;
    }

    return (
        <>
            <h1>Order Details</h1>
            <div>
                <Button size="large" variant="outlined" onClick={sendOrder}>Complete Order</Button>
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