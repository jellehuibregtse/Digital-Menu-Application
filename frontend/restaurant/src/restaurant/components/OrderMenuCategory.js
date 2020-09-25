import React, {Component} from 'react';

function loadRestaurantSettings() {
    // todo: get items from current category
}

class OrderMenuCategory extends Component {
    render() {
        return (
            <div>
                <h1>Appetizers</h1>
                <div id="menu-items" className="item-flex"/>
            </div>
        )
    }
    componentDidMount() {
        loadRestaurantSettings();
    }
}

export default OrderMenuCategory;