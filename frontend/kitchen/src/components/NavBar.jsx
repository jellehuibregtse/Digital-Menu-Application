import React, {useEffect, useState} from "react";
import RestaurantService from "../services/RestaurantService";

const NavBar = () => {
    const [restaurant, setRestaurant] = useState("");

    const RESTAURANT_ID = "1";

    useEffect(() => {
        RestaurantService.getRestaurant(RESTAURANT_ID).then(result => {
            console.log(result);
            try {
                setRestaurant(result.data.name);
            } catch (e) {
            }
        });
    }, []);

    return (
        <div className="main">
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Orders</a>

                <a className="navbar-brand" href="#">
                    <h4> Hi 'Insert User Name'! Welcome to {restaurant}!</h4>
                </a>
                <button className="btn btn-primary btn-badge btn-lg"> Log In</button>
            </nav>
        </div>
    );
};

export default NavBar;
