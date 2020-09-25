import React, {Component} from 'react';
import '../css/table.css';

let hasOrdered = true;

class OrderBar extends Component {
    render() {
        return (
            <div id="table">
                <a href="/restaurant-name/6/order">Take new order</a>
                <a>Something wrong with the food?</a>
                {hasOrdered? (<a>Continue to Checkout</a>) : (<a>Dismiss table</a>)}
            </div>
        );
    }
}

export default OrderBar;