import React, {Component} from 'react';
import '../../css/menu.css';

function loadMenu(categoriesE, categories, session) {
    JSON.parse(categories).forEach(category => {
        let item = document.createElement("a");
        item.textContent = category;
        item.href = "/" + session.restaurant.name + "/" + session.tableId + "/order/" + category;
        categoriesE.appendChild(item);
    });
}

class Menu extends Component {

    componentDidMount() {
        loadMenu(this.categoriesE, this.props.categories, this.props.session);
    }

    render() {
        return (
            <div id="menu">
                <h1>Menu</h1>
                <div id="categories" className="item-flex" ref={(categoriesE) => { this.categoriesE = categoriesE; }}/>
            </div>
        )
    }
}

export default Menu;