import React, {useEffect, useState} from "react";
import OrderView from "./components/orders/OrderView";
import MessagingService from "./services/MessagingService";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Account from "./components/account/Account";
import NavBar from "./components/NavBar";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import deepOrange from "@material-ui/core/colors/deepOrange";
import RestaurantList from "./components/RestaurantList";

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

    const [restaurant, setRestaurant] = useState({});
    const [orders, setOrders] = useState([]);
    const [restaurants, setRestaurants] = useState(null);

    useEffect(() => {
        if (restaurant.id != null) {
            MessagingService.register(
                "/orders/" + restaurant.id,
                (m) => {
                    setOrders(JSON.parse(m.body))
                },
                () => {
                },
                () => {
                    MessagingService.fetchHandler("GET", "/api/order-service/orders/restaurant/" + restaurant.id)
                        .then((res) => {
                            setOrders(res);
                        })
                        .catch(() => {
                        });
                }
            );
        }
    }, [restaurant]);

    useEffect(() => {
        if (loggedIn) {
            MessagingService.fetchHandler('GET', '/api/restaurant-service/restaurants/user')
                .then(r => setRestaurants(r))
                .catch(() => setRestaurants([]));
        }
    }, [loggedIn])

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <NavBar loggedIn={loggedIn} email={loggedIn ? parseSubFromJwt(localStorage.getItem('token')) : null}/>
                {loggedIn?
                    restaurants !== null ?
                    <Switch>
                        <Route exact strict path="/"
                               render={() => <RestaurantList restaurants={restaurants}/>}/>
                        <Route strict path={restaurants.map(restaurant => "/" + restaurant.name)}
                               render={(props) => {
                                   setRestaurant(restaurants.find(restaurant => restaurant.name === props.history.location.pathname.substring(1).split('/')[0]));
                                   return <OrderView restaurantName={restaurant.displayName} orders={orders}/>}}/>

                        <Route path="*"><Redirect to="/"/></Route>
                    </Switch> : null :
                    <Switch>
                        <Route exact strict path="/sign-in"
                               render={(props) => <Account {...props} form="sign-in"/>}/>

                        <Route exact strict path="/sign-up"
                               render={(props) => <Account {...props} form="sign-up"/>}/>

                        <Route path="*" render={() => <Redirect to="/sign-in"/>}/>
                    </Switch>}
            </ThemeProvider>
        </Router>
    );
}

export default App;
