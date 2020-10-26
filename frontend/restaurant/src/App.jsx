import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import CompleteOrder from "./components/CompleteOrder";
import JoinRestaurant from "./components/JoinRestaurant";

const App = () => {

    // Session contains: tableNumber, restaurant and current menu
    const session = JSON.parse(sessionStorage.getItem('session'));

    return (
        <Router>
            <div className="App">
                <Switch>

                    <Route exact strict path={"/qr"} component={JoinRestaurant}/>

                    {session != null? <Switch>
                        <Route exact strict path={"/" + session.restaurant.name + "/" + session.tableNumber}><Home session={session}/></Route>
                        <Route exact strict path={"/" + session.restaurant.name + "/" + session.tableNumber + "/order"}><Menu session={session}/></Route>
                        <Route exact strict path={"/" + session.restaurant.name + "/" + session.tableNumber + "/order/place"}><CompleteOrder session={session}/></Route>

                        <Route path="*"> <Redirect to={"/" + session.restaurant.name + "/" + session.tableNumber}/></Route>
                    </Switch> : null}

                    <Route path="*"><Redirect to="/"/></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;