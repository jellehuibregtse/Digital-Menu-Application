import React, {useEffect, useState} from "react";
import "./css/App.css";
import OrderView from "./components/OrderView";
import MessagingService from "./services/MessagingService";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Account from "../../admin-panel/src/components/account/Account";
import NavBar from "../../admin-panel/src/components/NavBar";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import deepOrange from "@material-ui/core/colors/deepOrange";

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

    // Run once at runtime
    useEffect(() => {
        if (restaurant.id != null) {
            async function fetchOrders() {
                await MessagingService.fetchHandler("GET", "/restaurant-service/restaurants/" + restaurant.id)
                    .then((res) => {
                        setRestaurant(res);
                    })
                    .catch(() => {
                    });

                await MessagingService.register(
                    "/orders/" + restaurant.id,
                    (m) => {
                        setOrders(JSON.parse(m.body))
                    },
                    () => {
                    },
                    () => {
                        MessagingService.fetchHandler("GET", "/orders/restaurant/" + restaurant.id)
                            .then((res) => {
                                setOrders(res);
                            })
                            .catch(() => {
                            });
                    }
                );
            }

            fetchOrders().then();
        }
    }, [restaurant]);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <NavBar loggedIn={loggedIn} restaurantName={restaurant.name}
                        email={loggedIn ? parseSubFromJwt(localStorage.getItem('token')) : null}/>
                {loggedIn ?
                    <Switch>
                        <Route path="/" exact render={() => (<OrderView orders={orders} count={1}/>)}/>

                        <Route path="*"><Redirect to="/"/></Route>
                    </Switch> :
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
