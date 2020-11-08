import React, { useState } from 'react';
import MessagingService from "../../services/MessagingService";
import { ListItemText, Button, List, ListItem, Divider } from "@material-ui/core";
import { useStateValue } from '../../context/stateProvider';
import BasketItem from './BasketItem';

const Basket = () => {

    const [state, dispatch] = useStateValue();

    const [message, setMessage] = useState("");

    const sendOrder = () => {
        console.log(order)
        if (state.order.length > 0) {
            MessagingService.fetchHandler('POST','/order-service/orders', {
                restaurantId: state.restaurant.id,
                tableNumber: state.tableNumber,
                items: order.map((item) => { return ({ name: item.name, quantity: item.quantity })})
            }).then(() => {
                setMessage("Your order has just been sent to the kitchen");
            }).catch((e) => {
                setMessage(e);
            })

            dispatch({
                type: "Clear cart"
            })

        }
        else {
            setMessage("")
        }

    }

    //Set quantity to the ordered items
    let counter = 0;
    let order = state.order
        // Sort items by name
        .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        //Count items with similar names
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

    if (order.length > 0) {
        orderItemsList = order.map((item, index) => <BasketItem key={index} item={item} />)
        orderTotalSum = order.reduce(((acc, item) => acc + (item.price * item.quantity)), 0).toFixed(2);
    } else {
        orderItemsList = [
            <>
                <ListItem>
                    <ListItemText primary="Your basket is empty"/>
                </ListItem>
                <Divider/>
            </>];
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
                <ListItem>
                    <ListItemText primary={"TOTAL: €" + orderTotalSum} />
                </ListItem>
            </div>

        </>
    )
}

export default Basket;