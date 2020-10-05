import MessagingService from "../services/MessagingService";
import React, { useState } from "react";

const JoinRestaurant = (props) => {
    const [error, setError] = useState([''])

    // Get parameters from URL
    let restaurantId  = parseInt(new URLSearchParams(props.location.search).get('restaurantId'));
    let tableId = parseInt(new URLSearchParams(props.location.search).get('tableId'));

    if(restaurantId >= 0 && tableId >= 0) {
        // Get restaurant by id
        MessagingService.tryGetMessage(8081, '/restaurants/' + restaurantId).then(
            (restaurant) => {
                // Get menu from restaurant
                MessagingService.tryGetMessage(8082, '/menus/' + restaurant.menuIDs[0]).then(
                    (menu) => {
                        // Set session to restaurant, menu and tableNumber
                        sessionStorage.setItem('session', JSON.stringify({
                            restaurant: restaurant,
                            menu: menu,
                            tableNumber: tableId
                        }));
                        document.location.href = "/";
                    }
                ).catch((e) => {setError(e)});
            }
        ).catch((e) => {setError(e)});
    }

    return(
        <>
            <h1>{error}</h1>
        </>
    )
}

export default JoinRestaurant;