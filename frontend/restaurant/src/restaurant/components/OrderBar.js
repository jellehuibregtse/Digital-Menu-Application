import React, {Component} from 'react';
import '../css/orderBar.css';

class OrderBar extends Component {
    render() {
        return (
            <div id="order-bar">
                <a href="/restaurant-name/6/order-data" id="order-data">
                    <a>Table 6</a>
                    <a>4 Items</a>
                    <a>Total order price: $36,-</a>
                </a>
                <div id="order-continue">
                    <a href="/restaurant-name/6">Cancel order</a>
                    <a>Complete order</a>
                </div>
            </div>
        );
    }
}

export default OrderBar;