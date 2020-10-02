import React from 'react';
import { Component } from 'react';
import {  BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from './default/components/Home';
import NavBar from "./default/components/NavBar";

import Banner from "./restaurant/components/Banner";
import OrderBar from "./restaurant/components/order/OrderBar";
import Table from "./restaurant/components/Table";
import Menu from "./restaurant/components/order/Menu";
import RestaurantHome from './restaurant/components/Home';
import CompleteOrder from "./restaurant/components/order/CompleteOrder";
import MenuCategory from "./restaurant/components/order/MenuCategory";
import Error from "./restaurant/components/Error";

import MenuService from "./restaurant/services/MenuService";

import session from "./restaurant/models/Session";
import restaurant from "./restaurant/models/Restaurant";
import menu from "./restaurant/models/Menu";

class App extends Component {

    session = null;

    componentWillMount() {
        try {
            this.session = JSON.parse(sessionStorage.getItem('session'));
        } catch (e) {}
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

                        <Route exact strict path={"/create/:restaurantId/:tableId"}>
                                {
                                    function ({match}) {
                                        let menus;
                                        MenuService.getAllMenus(match.params.restaurantId).then(res => {
                                            try {
                                                console.log(JSON.parse(res));
                                                JSON.parse(res).forEach(m => {
                                                    menus.add(new menu(m.name, m.categories));
                                                })

                                                sessionStorage.setItem('session', JSON.stringify(new session(new restaurant(match.params.restaurantId), match.params.tableId, menus)))
                                                console.log(JSON.parse(sessionStorage.getItem('session')).restaurant.name);
                                                return(
                                                    <Redirect to={"/" + JSON.parse(sessionStorage.getItem('session')).restaurant.name + "/" + JSON.parse(sessionStorage.getItem('session')).tableId}/>
                                                )
                                            } catch (e) {}
                                        }).catch(e => {})
                                    }
                                }
                        </Route>

                        {this.session != null?
                            <Route exact strict path={"/" + this.session.restaurant.name}>
                                <>
                                    <NavBar/>
                                    <div className="content">
                                        <Banner/>
                                        <RestaurantHome/>
                                    </div>
                                </>
                            </Route> : null}

                        {this.session != null?
                            <Route exact strict path={"/" + this.session.restaurant.name + "/" + this.session.tableId}>
                                <>
                                    <NavBar/>
                                    <div className="content">
                                        <Banner/>
                                        <Table session={this.session}/>
                                    </div>
                                </>
                            </Route> : null}

                        {this.session != null?
                                <Route exact strict path={"/" + this.session.restaurant.name + "/" + this.session.tableId + "/order"}>
                                    <>
                                        <NavBar/>
                                        <div className="content">
                                            <Banner/>
                                            <Menu session={this.session} categories={sessionStorage.getItem('menu')}/>
                                            <OrderBar session={this.session}/>
                                        </div>
                                    </>
                                </Route> : null}

                        {this.session != null?
                                <Route exact strict path={"/" + this.session.restaurant.name + "/" + this.session.tableId + "/order/place"}>
                                    <>
                                        <NavBar/>
                                        <div className="content">
                                            <Banner/>
                                            <CompleteOrder session={this.session}/>
                                        </div>
                                    </>
                                </Route> : null}

                        {this.session != null && this.session.menus != null?
                            this.session.menus[0].categories.forEach(cat => {
                                return (
                                    <Route exact strict path={"/" + this.session.restaurant.name + "/" + this.session.tableId + "/order/" + cat.name}>
                                        <>
                                            <NavBar/>
                                            <div className="content">
                                                <Banner/>
                                                <MenuCategory category={cat.name} dishes={cat.dishes}/>
                                                <OrderBar/>
                                            </div>
                                        </>
                                    </Route>
                                )
                            }) : null}

                        {this.session != null?
                            <Route path={"/" + this.session.restaurant.name + "/" + this.session.tableId + "/*"}>
                                <>
                                    <Redirect to={"/" + this.session.restaurant.name + "/" + this.session.tableId}/>
                                </>
                            </Route> : null}

                        {this.session != null?
                            <Route path={"/" + this.session.restaurant.name + "/*"}>
                                <>
                                    <Redirect to={"/" + this.session.restaurant.name}/>
                                </>
                            </Route> : null}

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