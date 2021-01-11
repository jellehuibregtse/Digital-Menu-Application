import React, { useState } from 'react';
import MessagingService from "../../services/MessagingService";
import { ListItemText, Button, List, ListItem, Divider } from "@material-ui/core";
import { useStateValue } from '../../context/stateProvider';
import BasketItem from './BasketItem';

const Basket = (props) => {

    const [state, dispatch] = useStateValue();

    const [message, setMessage] = useState("");

    const sendOrder = () => {
        if (state.order.length > 0) {
            console.log({
                restaurantId: props.id,
                tableNumber: state.tableNumber,
                items: order.map((item) =>  ({ name: item.name, quantity: item.quantity, id: item.id }))
            })
            MessagingService.fetchHandler('POST','/api/order-service/orders', {
                restaurantId: props.id,
                tableNumber: state.tableNumber,
                items: order.map((item) =>  ({ name: item.name, quantity: item.quantity }))
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
            counter++;
            if (typeof array[index + 1] === 'undefined' || item.name !== array[index + 1].name) {
                item.quantity = counter;
                counter = 0;
                return item;
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