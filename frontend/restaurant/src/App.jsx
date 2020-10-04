import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./restaurant/components/Home";
import Menu from "./restaurant/components/Menu";
import CompleteOrder from "./restaurant/components/CompleteOrder";
import JoinRestaurant from "./restaurant/components/JoinRestaurant";

const App = () => {

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