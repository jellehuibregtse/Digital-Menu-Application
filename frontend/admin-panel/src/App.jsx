import React, {useEffect, useState} from 'react';
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {deepOrange} from "@material-ui/core/colors";
import NavBar from "./components/NavBar";
import Account from "./components/account/Account";
import RestaurantList from "./components/restaurant/RestaurantList";
import New from "./components/restaurant/New";
import NewMenu from "./components/restaurant/menu/NewMenu";
import MessagingService from "./services/MessagingService";
import RestaurantPage from "./components/restaurant/RestaurantPage";
import Settings from "./components/restaurant/Settings";

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

    const [restaurants, setRestaurants] = useState(null);

    useEffect(() => {
        if (loggedIn) {
            MessagingService.fetchHandler('GET', '/api/restaurant-service/restaurants/user')
                .then(r => setRestaurants(r))
                .catch(() => setRestaurants([]));
        }
    }, [])

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <NavBar loggedIn={loggedIn} email={loggedIn ? parseSubFromJwt(localStorage.getItem('token')) : null}/>
                <Switch>
                    {loggedIn ?
                        restaurants !== null ?
                            <Switch>
                                <Route exact strict path="/"
                                       render={() => <RestaurantList restaurants={restaurants}/>}/>

                                <Route exact strict path="/new" render={() => <New/>}/>
                                <Route strict path={restaurants.map(restaurant => "/" + restaurant.name)}
                                       render={(props) => {
                                           const restaurant = restaurants.find(restaurant => restaurant.name === props.history.location.pathname.substring(1).split('/')[0]);
                                           return <RestaurantPage id={restaurant.id} name={restaurant.name} displayName={restaurant.displayName} id={restaurant.id}/>}}/>

                                <Route path="*" render={() => <Redirect to="/"/>}/>
                            </Switch> : null :
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