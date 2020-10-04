import MessagingService from "../services/MessagingService";
import React, { useState } from "react";

const JoinRestaurant = (props) => {
    const [error, setError] = useState([''])

    let restaurantId  = parseInt(new URLSearchParams(props.location.search).get('restaurantId'));
    let tableId = parseInt(new URLSearchParams(props.location.search).get('tableId'));
    console.log(restaurantId + "t" + tableId);

    if(restaurantId >= 0 && tableId >= 0) {
        MessagingService.tryGetMessage(8081, '/restaurants/' + restaurantId).then(
            (restaurant) => {
                console.log(restaurant);
                MessagingService.tryGetMessage(8082, '/menus/' + restaurant.menuIDs[0]).then(
                    (menu) => {
                        sessionStorage.setItem('session', JSON.stringify({
                            restaurant: restaurant,
                            menu: menu,
                            tableId: tableId
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