import React from 'react';
import '../css/menu.css';
import NavBar from "./fragments/NavBar";
import Banner from "./fragments/Banner";
import OrderBar from "./fragments/OrderBar";

const Menu = (props) => {
    const categories = [];
    props.session.menu.items.forEach(item => {categories.add(<a href={"/" + props.session.restaurant.name + "/" + props.session.tableId + "/order/" + item.name}>{item.name}</a>)})

    return (
        <>
            <NavBar session={props.session}/>
            <div className="content">
                <Banner/>
                <div id="menu">
                    <h1>{props.session.menu.name}</h1>
                    <div id="categories" className="item-flex">{categories}</div>
                </div>
                <OrderBar session={props.session}/>
            </div>
        </>
    )
}

export default Menu;