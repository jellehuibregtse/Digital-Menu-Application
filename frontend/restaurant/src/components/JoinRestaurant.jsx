import MessagingService from "../services/MessagingService";
import React, { useState, useEffect } from "react";

const JoinRestaurant = (props) => {
    const [error, setError] = useState([''])

    // Run once at runtime
    useEffect(() => {
        // Get parameters from URL
        let restaurantId  = parseInt(new URLSearchParams(props.location.search).get('restaurantId'));
        let tableId = parseInt(new URLSearchParams(props.location.search).get('tableId'));

        if (restaurantId >= 0 && tableId >= 0) {
            // Get restaurant by id
            MessagingService.fetchHandler('GET','/restaurant-service/restaurants/' + restaurantId).then(
                (restaurant) => {
                    // Get menu from restaurant
                    MessagingService.fetchHandler('GET','/menu-service/menus/' + restaurant.menuIDs[0]).then(
                        (menu) => {
                            // Set session to restaurant, menu and tableNumber
                            sessionStorage.setItem('session', JSON.stringify({
                                restaurant: restaurant,
                                menu: menu,
                                tableNumber: tableId
                            }));
                            document.location.href = "/";
                        }
                    ).catch((e) => {
                        setError(e)
                    });
                }
            ).catch((e) => {
                setError(e)
            });
        }
    },[])

    return(
        <>
            <h1>{error}</h1>
        </>
    )
}

export default JoinRestaurant;