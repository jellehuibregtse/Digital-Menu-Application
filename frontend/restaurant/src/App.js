import React from 'react';
import { Component } from 'react';
import {  BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from './default/components/Home';
import NavBar from "./default/components/NavBar";

import restaurant from "./restaurant/Restaurant";
import Banner from "./restaurant/components/Banner";
import OrderMenuCategory from "./restaurant/components/OrderMenuCategory";
import OrderBar from "./restaurant/components/OrderBar";
import Table from "./restaurant/components/Table";
import OrderMenu from "./restaurant/components/OrderMenu";
import RestaurantHome from './restaurant/components/Home';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact strict path="/">
                            <>
                                <NavBar/>
                                <div className="content">
                                    <Home/>
                                </div>
                            </>
                        </Route>

                        {/* customer */}

                            <Route exact strict path={"/" + restaurant.getName()}>
                                <>
                                    <NavBar/>
                                    <div className="content">
                                        <Banner/>
                                        <RestaurantHome/>
                                    </div>
                                </>
                            </Route>

                            <Route exact strict path={"/" + restaurant.getName() + "/" + restaurant.getTable()}>
                                <>
                                    <NavBar/>
                                    <div className="content">
                                        <Banner/>
                                        <Table/>
                                    </div>
                                </>
                            </Route>

                            <Route exact strict path={"/" + restaurant.getName() + "/" + restaurant.getTable() + "/order"}>
                                <>
                                    <NavBar/>
                                    <div className="content">
                                        <Banner/>
                                        <OrderMenu/>
                                        <OrderBar/>
                                    </div>
                                </>
                            </Route>

                            {restaurant.getMenu().map(category => {
                                console.log(category);
                                return (
                                    <Route exact strict path={"/" + restaurant.getName() + "/" + restaurant.getTable() + "/order/" + category}>
                                        <>
                                            <NavBar/>
                                            <div className="content">
                                                <Banner/>
                                                <OrderMenuCategory/>
                                                <OrderBar/>
                                            </div>
                                        </>
                                    </Route>
                                )
                            })}

                            <Route path={"/" + restaurant.getName() + "/" + restaurant.getTable() + "/*"}>
                                <Redirect to={"/" + restaurant.getName() + "/" + restaurant.getTable()}/>
                            </Route>

                            <Route path={"/" + restaurant.getName() + "/*"}>
                                <Redirect to={"/" + restaurant.getName()}/>
                            </Route>


                        <Route path="*">
                            <Redirect to="/"/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;