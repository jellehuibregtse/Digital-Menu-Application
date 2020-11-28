import React from 'react';
import {ListItemText, Select, ListItemIcon, ListItem, Button, Divider, MenuItem} from '@material-ui/core';
import {FastfoodSharp} from '@material-ui/icons';
import { useStateValue } from '../../context/stateProvider';

const BasketItem = (props) => {
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
                    <FastfoodSharp color="primary" />
                </ListItemIcon>
                <ListItemText primary={props.item.name} />
                <ListItemText primary={"€ " + price + " x " + props.item.quantity} />
                <div>
                    {/*aamount */}
                    {/*<Select labelId="demo-customized-select-label" variant="outlined" color="primary">*/}
                    {/*    <MenuItem value={1}>1</MenuItem>*/}
                    {/*</Select>*/}
                    <Button item={props.item.name} onClick={onDelete} variant="outlined" color="secondary">Delete</Button>
                </div>
            </ListItem>
            <Divider />
        </>
    );
}

export default BasketItem;