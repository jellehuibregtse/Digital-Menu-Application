import React from 'react';
import NavBar from "./fragments/NavBar";
import Banner from "./fragments/Banner";
import OrderBar from "./fragments/OrderBar";

const Category = (props) => {
    return (
        <>
            <NavBar session={props.session}/>
            <div className="content">
                <h1>{props.category.name}</h1>
                <div className="item-flex"/>
                <OrderBar/>
            </div>
        </>
    )
}

export default Category;