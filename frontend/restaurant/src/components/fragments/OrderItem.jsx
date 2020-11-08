import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FastfoodSharpIcon from '@material-ui/icons/FastfoodSharp';
import { useStateValue } from '../../context/stateProvider';

const OrderItem = (props) => {
    const[state,dispatch] = useStateValue();

    const onDelete = (e) => {
        let deletedItem = e.target.parentNode.getAttribute("item");
        console.log(deletedItem)
        dispatch({
            type: "Remove from cart",
            item: {
                id: props.item.id,
                name: props.item.name,
                price: props.item.price
              }
        })
    }

    const price = typeof props.item.price !== 'undefined'? props.item.price.toFixed(2) : "-";
    return (
        <>
            <ListItem key={props.item.id}>
                <ListItemIcon>
                    <FastfoodSharpIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={props.item.name} />
                <ListItemText primary={"€ " + price + " x " + props.item.quantity} />
                <Button item={props.item.name} onClick={onDelete} variant="outlined" color="secondary">Delete</Button>
            </ListItem>
            <Divider />
        </>
    );
}

export default OrderItem;