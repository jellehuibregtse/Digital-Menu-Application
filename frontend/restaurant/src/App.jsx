import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import CompleteOrder from "./components/CompleteOrder";
import JoinRestaurant from "./components/JoinRestaurant";
import NavBar from "./components/fragments/NavBar";
import Banner from "./components/fragments/Banner";
import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey } from "@material-ui/core/colors";

const App = () => {
    // Session contains: tableNumber, restaurant and current menu
    const [session] = useState(JSON.parse(sessionStorage.getItem('session')) != null ? JSON.parse(sessionStorage.getItem('session')) :
        {
            restaurant: {
                name: "test"
            }, tableNumber: 0,
            menu: {
                id: 0,
                name: "Test Menu",
                items: [
                    { id: 0, name: "test item 1", price: 9.99 }, 
                    { id: 1, name: "test item 2", price: 11.99 },
                    { id: 2, name: "test item 3", price: 19.00 },
                    { id: 3, name: "test item 4", price: 5.59 },
                    { id: 4, name: "test item 5", price: 9.00 },
                    { id: 5, name: "test item 6", price: 1.99 }]
            }
        });

    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: grey["800"],
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Container className="app">
                    <Switch>
                        <Route exact strict path={"/qr"} component={JoinRestaurant} />
                        {session != null ? <Switch>
                            <Route exact strict path={"/" + session.restaurant.name + "/" + session.tableNumber}>
                                <NavBar session={session} />
                                <Banner session={session} />
                                <Container>
                                    <Home session={session} />
                                </Container>
                            </Route>
                            <Route exact strict path={"/" + session.restaurant.name + "/" + session.tableNumber + "/order"}>
                                <NavBar session={session} icons={["ArrowBack"]} />
                                <Banner session={session} />
                                <Container>
                                    <Menu session={session} />
                                </Container>
                            </Route>
                            <Route exact strict path={"/" + session.restaurant.name + "/" + session.tableNumber + "/order/place"}>
                                <NavBar session={session} icons={["ArrowBack"]} />
                                <Banner session={session} />
                                <Container>
                                    <CompleteOrder session={session} />
                                </Container>
                            </Route>

                            <Route path="*">
                                <Redirect to={"/" + session.restaurant.name + "/" + session.tableNumber} />
                            </Route>
                        </Switch> : null}

                        <Route path="*"><Redirect to="/" /></Route>
                    </Switch>
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;