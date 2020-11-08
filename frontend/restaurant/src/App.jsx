import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Menu from "./components/Menu";
import CompleteOrder from "./components/CompleteOrder";
import JoinRestaurant from "./components/JoinRestaurant";
import NavBar from "./components/fragments/NavBar";
import Banner from "./components/fragments/Banner";
import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey } from "@material-ui/core/colors";
import { useStateValue } from './context/stateProvider';

const App = () => {
    const [state] = useState(JSON.parse(sessionStorage.getItem("session")) != null? JSON.parse(sessionStorage.getItem("session")) : []);

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
                        {state.menu != null ? <Switch>
                            <Route exact strict path={"/"}>
                                <NavBar />
                                <Banner />
                                <Container>
                                    <Menu menu={state.menu} />
                                </Container>
                            </Route>
                            <Route exact strict path={"/place-order"}>
                                <NavBar />
                                <Banner />
                                <Container>
                                    <CompleteOrder />
                                </Container>
                            </Route>

                            <Route path="*">
                                <Redirect to={"/"} />
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