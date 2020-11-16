import React, {useEffect, useState} from 'react';
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {deepOrange} from "@material-ui/core/colors";
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
                    {loggedIn ?
                        <Switch>
                            <Route exact strict path="/" render={() => <RestaurantList/>}/>

                            <Route exact strict path="/restaurant/create"/>

                            <Route exact strict path="/restaurant/settings"/>

                            <Route exact strict path="/menu" render={() => <MenuList/>}/>

                            <Route exact strict path="/categories"/>

                            <Route exact strict path="/design" render={() => <Design/>}/>

                            <Route path="*" render={() => <Redirect to="/"/>}/>
                        </Switch> :
                        <Switch>
                            <Route exact strict path="/sign-in" render={(props) => <Account {...props} form="sign-in"/>}/>

                            <Route exact strict path="/sign-up" render={(props) => <Account {...props} form="sign-up"/>}/>

                            <Route path="*" render={() => <Redirect to="/sign-in"/>}/>
                        </Switch>}
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

export default App;
