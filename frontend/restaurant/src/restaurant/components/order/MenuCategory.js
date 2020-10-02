import React, {Component} from 'react';

function loadDishes(dishesE, dishes, category, session) {
    JSON.parse(dishes).forEach(dish => {
        let item = document.createElement("a");
        item.textContent = dish;
        item.href = "/" + session.restaurant.name + "/" + session.tableId + "/order/" + category + "/" + dish;
        dishesE.appendChild(item);
        console.log(dish);
    });
}

class MenuCategory extends Component {

    componentDidMount() {
        loadDishes(this.dishesE, this.props.category.dishes, this.props.category, this.props.session);
    }

    render() {
        return (
            <div>
                <h1>{this.props.category}</h1>
                <div id="menu-items" className="item-flex" ref={(dishesE) => { this.dishesE = dishesE; }}/>
            </div>
        )
    }
}

export default MenuCategory;