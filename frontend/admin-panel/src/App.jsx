import React, {useEffect, useState} from 'react';
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {deepOrange} from "@material-ui/core/colors";
import NavBar from "./components/NavBar";
import Design from "./components/design/Design";
import MenuList from "./components/menu/MenuList";
import Account from "./components/account/Account";
import RestaurantList from "./components/restaurant/RestaurantList";
import New from "./components/restaurant/New";
import MessagingService from "./services/MessagingService";
import Cookies from 'js-cookie'

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

const parseSubFromJwt = (token) => {
    try {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload).sub;
    } catch (e) {
        return null;
    }
};

const App = () => {
    const loggedIn = localStorage.getItem('token');

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        MessagingService.fetchHandler('GET', '/api/restaurant-service/restaurants/user')
            .then(r => setRestaurants(r))
            .catch(r => console.log(r))
    }, [])

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <NavBar loggedIn={loggedIn} email={loggedIn ? parseSubFromJwt(localStorage.getItem('token')) : null}/>
                <Switch>
                    {loggedIn ?
                        <Switch>
                            <Route exact strict path="/" render={() => <RestaurantList restaurants={restaurants}/>}/>

                            <Route exact strict path="/new" render={() => <New/>}/>

                            <Route exact strict path="/restaurant/settings"/>

                            <Route exact strict path="/menu" render={() => <MenuList/>}/>

                            <Route exact strict path="/categories"/>

                            <Route exact strict path="/design" render={() => <Design/>}/>

                            <Route path="*" render={() => <Redirect to="/"/>}/>
                        </Switch> :
                        <Switch>
                            <Route exact strict path="/sign-in"
                                   render={(props) => <Account {...props} form="sign-in"/>}/>

                            <Route exact strict path="/sign-up"
                                   render={(props) => <Account {...props} form="sign-up"/>}/>

                            <Route path="*" render={() => <Redirect to="/sign-in"/>}/>
                        </Switch>}
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

export default App;