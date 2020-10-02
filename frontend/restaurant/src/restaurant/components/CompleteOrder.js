import React, {Component} from 'react';
import OrderService from "../services/OrderService";

class CompleteOrder extends Component {

    componentDidMount() {
        OrderService.placeOrder(sessionStorage.getItem('order')).then(res => {
            this.orderStatus.innerText = "Order status: " + res;
            sessionStorage.removeItem('order');
        });
    }

    render() {
        return (
            <div>
                <p ref={(order) => { this.orderStatus = order; }}>Order status: processing</p>
                <a href="restaurant-name/6">Return to table</a>
            </div>
        );
    }
}

export default CompleteOrder;