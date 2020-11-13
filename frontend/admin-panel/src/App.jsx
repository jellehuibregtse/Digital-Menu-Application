import React, {useEffect, useState} from 'react';
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { deepOrange } from "@material-ui/core/colors";
import NavBar from "./components/NavBar";
import Design from "./components/design/Design";
import MenuList from "./components/menu/MenuList";
import Account from "./components/account/Account";
import RestaurantList from "./components/restaurant/RestaurantList";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#373b41',
            light: '#f5f7fa',
            contrastText: '#fff'
        },
        secondary: {
            main: deepOrange['800'],
            contrastText: '#fff'
        }
    },

});

const App = () => {

    const loggedIn = sessionStorage.getItem('bearer') !== null;

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <NavBar loggedIn={loggedIn} email={'restaurant.owner@gmail.com'}/>
                <Switch>
                    {loggedIn?
                        <Switch>
                            <Route exact strict path="/">
                                <RestaurantList/>
                            </Route>

                            <Route exact strict path="/restaurant/create">
                            </Route>
                            <Route exact strict path="/restaurant/settings">
                            </Route>

                            <Route exact strict path="/menu">
                                <MenuList/>
                            </Route>

                            <Route exact strict path="/categories">

                            </Route>

                            <Route exact strict path="/design">
                                <Design/>
                            </Route>

                            <Route path="*">
                                <Redirect to="/"/>
                            </Route>
                        </Switch> :
                        <Switch>
                            <Route exact strict path="/sign-in">
                                <Account form='sign-in'/>
                            </Route>

                            <Route exact strict path="/sign-up">
                                <Account form='sign-up'/>
                            </Route>

                            <Route path="*">
                                <Redirect to="/sign-in"/>
                            </Route>
                        </Switch>}
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

export default App;
