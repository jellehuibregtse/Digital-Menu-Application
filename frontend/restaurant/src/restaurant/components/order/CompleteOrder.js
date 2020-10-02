import React, {Component} from 'react';
import OrderService from "../../services/OrderService";

function placeOrder(e, orderStatus) {
    orderStatus.innerText = "Order status: processing";
    OrderService.placeOrder(sessionStorage.getItem('order')).then(res => {
        orderStatus.innerText = "Order status: " + res;
        sessionStorage.removeItem('order');
    });
}

class CompleteOrder extends Component {
    render() {
        return (
            <div>
                <h1>Order Details</h1>
                <a href="javascript:void(0)" onClick={(e) => {placeOrder(e, this.orderStatus)}}>Send order</a>
                <p ref={(order) => { this.orderStatus = order; }}/>
                <a href="restaurant-name/6">Return to table</a>
            </div>
        );
    }
}

export default CompleteOrder;