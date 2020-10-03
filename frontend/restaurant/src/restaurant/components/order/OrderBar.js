import React, {Component} from 'react';
import '../../css/orderBar.css';

class OrderBar extends Component {
    render() {
        return (
            <div id="order-bar">
                <a href={"/" + this.props.session.restaurant.name + "/" + this.props.session.tableId}>Cancel order</a>
                <a href={"/" + this.props.session.restaurant.name + "/" + this.props.session.tableId + "/order/place"}>Complete order</a>
            </div>
        );
    }
}

export default OrderBar;