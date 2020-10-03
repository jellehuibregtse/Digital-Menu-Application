import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./restaurant/components/Home";
import Menu from "./restaurant/components/Menu";
import CompleteOrder from "./restaurant/components/CompleteOrder";
import JoinRestaurant from "./restaurant/components/JoinRestaurant";
import Dish from "./restaurant/components/Dish";

const App = () => {

    const session = JSON.parse(sessionStorage.getItem('session'));

    return (
        <Router>
            <div className="App">
                <Switch>

                    <Route exact strict path={"/qr"} component={JoinRestaurant}/>

                    {session != null? <Switch>
                        <Route exact strict path={"/" + session.restaurant.name + "/" + session.tableId}><Home session={session}/></Route>
                        <Route exact strict path={"/" + session.restaurant.name + "/" + session.tableId + "/order"}><Menu session={session}/></Route>
                        <Route exact strict path={"/" + session.restaurant.name + "/" + session.tableId + "/order/place"}><CompleteOrder session={session}/></Route>
                        {session.menu.items.forEach(item => {
                            return(
                                <Route exact strict path={"/" + session.restaurant.name + "/" + session.tableId + "/order/" + item.name}><Dish session={session} item={item}/></Route>
                            )
                        })}

                        <Route path="*"> <Redirect to={"/" + session.restaurant.name + "/" + session.tableId}/></Route>
                    </Switch> : null}

                    <Route path="*"><Redirect to="/"/></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;