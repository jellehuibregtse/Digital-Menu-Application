import MessagingService from "../services/MessagingService";
import React, { Component } from "react";


class JoinRestaurant extends Component {
    componentDidMount() {
        let { restaurantId } = this.props.match.params;
        let { tableId } = this.props.match.params;

        MessagingService.tryGetMessage(8081, '/restaurant/get', '?id=' + restaurantId).then(
            (restaurant) => {
                MessagingService.tryGetMessage(8082, '/menu/get', '?menuId=' + restaurant.menuIDs[0]).then(
                    (menu) => {
                        sessionStorage.setItem('session', JSON.stringify({
                            restaurant: restaurant,
                            menu: menu,
                            tableId: tableId
                        }));
                        console.log(JSON.parse(sessionStorage.getItem('session')));
                    }
                ).catch((e) => {console.log(e)});
            }
        ).catch((e) => {console.log(e)});
    }

    render() {
        return(
            <></>
        )
    }




    // let menus;
    //
    //
    // MessagingService.tryGetMessage(8082, '/menu/get-all', '?id='+ restaurantId).then(res => {
    //     try {
    //         console.log(JSON.parse(res));
    //         JSON.parse(res).forEach(m => {
    //             menus.add(new menu(m.name, m.categories));
    //         })
    //
    //         sessionStorage.setItem('session', JSON.stringify(new session(new restaurant(restaurantId), tableId, menus)))
    //         console.log(JSON.parse(sessionStorage.getItem('session')).restaurant.name);
    //         // return(
    //         //     <Redirect to={"/" + JSON.parse(sessionStorage.getItem('session')).restaurant.name + "/" + JSON.parse(sessionStorage.getItem('session')).tableId}/>
    //         // )
    //     } catch (e) {}
    // }).catch(e => {})
}

export default JoinRestaurant;