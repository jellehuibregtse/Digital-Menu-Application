import React from 'react';
import '../css/home.css';
import NavBar from "./fragments/NavBar";
import Banner from "./fragments/Banner";

const Home = (props) => {

    sessionStorage.removeItem('order');

    let hasOrdered = true;

    return (
        <>
            <NavBar session={props.session}/>
            <div className="content">
                <Banner/>
                <div id="table">
                    <a href={"/" + props.session.restaurant.name + "/" + props.session.tableNumber + "/order"}>Take new order</a>
                    <a>Something wrong with the food?</a>
                    {hasOrdered? (<a href="*" onClick={() => sessionStorage.clear()}>Continue to Checkout</a>) : (<a>Dismiss table</a>)}
                </div>
            </div>
        </>
    );
}

export default Home;