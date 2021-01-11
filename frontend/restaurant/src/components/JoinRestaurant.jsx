import MessagingService from "../services/MessagingService";
import React, {useState, useEffect} from "react";
import {Typography} from "@material-ui/core";

const JoinRestaurant = (props) => {
    const [error, setError] = useState('')

    // Run once at runtime
    useEffect(() => {
        // Get parameters from URL
        let restaurantId = parseInt(new URLSearchParams(props.location.search).get('restaurantId'));
        let tableId = parseInt(new URLSearchParams(props.location.search).get('tableId'));

        if (restaurantId >= 0 && tableId >= 0) {
            // Get restaurant by id
            MessagingService.fetchHandler('GET', '/api/restaurant-service/restaurants/' + restaurantId).then(
                (restaurant) => {
                    console.log(restaurant)
                    // Get menu from restaurant
                    MessagingService.fetchHandler('GET', '/api/menu-service/menus/byRestaurantId/' + restaurant.id).then(
                        (menus) => {
                            let menu = menus[0];
                            console.log(menu);
                            // Set session to restaurant, menu and tableNumber
                            sessionStorage.setItem('session', JSON.stringify({
                                restaurant: restaurant,
                                menu: menu,
                                tableNumber: tableId
                            }));
                            document.location.href = "/";
                        }
                    ).catch((e) => {
                        setError('No menu available for restaurant')
                    });
                }
            ).catch((e) => {
                setError(e.message)
            });
        }
    }, [])

    return (
        <>
            <Typography variant={"h5"} align={"center"}><strong>{error}</strong></Typography>
        </>
    )
}

export default JoinRestaurant;