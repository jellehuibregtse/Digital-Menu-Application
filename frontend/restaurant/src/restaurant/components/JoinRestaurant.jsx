import MessagingService from "../services/MessagingService";
import React from "react";

const JoinRestaurant = (props) => {

    let restaurantId  = new URLSearchParams(props.location.search).get('restaurantId');
    let tableId = new URLSearchParams(props.location.search).get('tableId');

    if(restaurantId && tableId) {
        MessagingService.tryGetMessage(8081, '/restaurant/get', '?id=' + restaurantId).then(
            (restaurant) => {
                MessagingService.tryGetMessage(8082, '/menu/get', '?menuId=' + restaurant.menuIDs[0]).then(
                    (menu) => {
                        sessionStorage.setItem('session', JSON.stringify({
                            restaurant: restaurant,
                            menu: menu,
                            tableId: tableId
                        }));
                        document.location.href = "/";
                    }
                ).catch((e) => {console.log(e)});
            }
        ).catch((e) => {console.log(e)});
    }

    return(
        <></>
    )
}

export default JoinRestaurant;