import React from 'react';
import { Component } from 'react';
import {  BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from './default/components/Home';
import NavBar from "./default/components/NavBar";

import Restaurant from "./restaurant/Restaurant";
import Banner from "./restaurant/components/Banner";
import OrderMenuCategory from "./restaurant/components/OrderMenuCategory";
import OrderBar from "./restaurant/components/OrderBar";
import Table from "./restaurant/components/Table";
import OrderMenu from "./restaurant/components/OrderMenu";
import RestaurantHome from './restaurant/components/Home';

class App extends Component {

    menu = [];
    restaurantName;

    constructor(props) {
        super(props);
        Restaurant.getMenu().then(res => this.menu = res);
    }

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

                            <Route exact strict path={"/" + Restaurant.getName()}>
                                <>
                                    <NavBar/>
                                    <div className="content">
                                        <Banner/>
                                        <RestaurantHome/>
                                    </div>
                                </>
                            </Route>

                            <Route exact strict path={"/" + Restaurant.getName() + "/" + Restaurant.getTable()}>
                                <>
                                    <NavBar/>
                                    <div className="content">
                                        <Banner/>
                                        <Table/>
                                    </div>
                                </>
                            </Route>

                            <Route exact strict path={"/" + Restaurant.getName() + "/" + Restaurant.getTable() + "/order"}>
                                <>
                                    <NavBar/>
                                    <div className="content">
                                        <Banner/>
                                        <OrderMenu/>
                                        <OrderBar/>
                                    </div>
                                </>
                            </Route>

                            {this.menu.map(category => {
                                return (
                                    <Route exact strict path={"/" + Restaurant.getName() + "/" + Restaurant.getTable() + "/order/" + category}>
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

                            <Route path={"/" + Restaurant.getName() + "/" + Restaurant.getTable() + "/*"}>
                                <Redirect to={"/" + Restaurant.getName() + "/" + Restaurant.getTable()}/>
                            </Route>

                            <Route path={"/" + Restaurant.getName() + "/*"}>
                                <Redirect to={"/" + Restaurant.getName()}/>
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