import React, {Component} from 'react';
import '../css/table.css';

let hasOrdered = true;

class OrderBar extends Component {

    session = null;

    componentWillMount() {
        try {
            this.session = JSON.parse(sessionStorage.getItem('session'));
        } catch (e) {}
    }

    render() {
        return (
            <div id="table">
                <a href={"/" + this.session.restaurant.name + "/" + this.session.tableId + "/order"}>Take new order</a>
                <a>Something wrong with the food?</a>
                {hasOrdered? (<a>Continue to Checkout</a>) : (<a>Dismiss table</a>)}
            </div>
        );
    }
}

export default OrderBar;