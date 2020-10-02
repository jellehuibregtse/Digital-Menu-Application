import React, {Component} from 'react';
import '../../css/orderBar.css';
import Order from "../../models/Order";

class OrderBar extends Component {
    render() {
        return (
            <div id="order-bar">
                <a href={"/" + this.props.session.restaurant.name + "/" + this.props.session.tableId}>Cancel order</a>
                <a href={"/" + this.props.session.restaurant.name + "/" + this.props.session.tableId + "/order/place"} onClick={() => {sessionStorage.setItem('order', JSON.stringify(new Order(0, 0, ["Salmon", "Sauvignon Blanc"], new Date().getDate())))}}>Complete order</a>
            </div>
        );
    }
}

export default OrderBar;