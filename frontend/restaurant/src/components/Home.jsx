import React from 'react';
import '../css/home.css';
import {Button} from "@material-ui/core";

const Home = (props) => {

    sessionStorage.removeItem('order');

    // Hardcoded value
    // TODO: get orders from order service by tableNumber
    let hasOrdered = true;

    return (
        <>
            <Button href={"/" + props.session.restaurant.name + "/" + props.session.tableNumber + "/order"}>Take new order</Button>
            <Button>Something wrong with the food?</Button>
            <Button href="*" onClick={() => sessionStorage.clear()}>{hasOrdered? "Continue to Checkout": "Dismiss table"}</Button>
        </>
    );
}

export default Home;