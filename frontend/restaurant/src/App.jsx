import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Menu from "./components/menu/Menu";
import Basket from "./components/order/Basket";
import JoinRestaurant from "./components/JoinRestaurant";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey, deepOrange } from "@material-ui/core/colors";
import { useStateValue } from './context/stateProvider';

const App = () => {
    //const [state] = useStateValue();
    const [state] = useState(JSON.parse(sessionStorage.getItem("session")) != null? JSON.parse(sessionStorage.getItem("session")) : []);

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
        }
    });

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route exact strict path={"/qr"} component={JoinRestaurant}/>
                    {state.menu != null ? <Switch>
                        <Route exact strict path={"/"}>
                            <NavBar />
                            <Banner />
                            <Container>
                                <Menu menu={state.menu} />
                            </Container>
                        </Route>
                        <Route exact strict path={"/basket"}>
                            <NavBar />
                            <Banner />
                            <Container>
                                <Basket id={state.restaurant.id}/>
                            </Container>
                        </Route>

                        <Route path="*">
                            <Redirect to={"/"} />
                        </Route>
                    </Switch> : null}
                    
                    <Route exact strict path="/"><h1>No restaurant selected</h1></Route>
                    <Route path="*"><Redirect to="/"/></Route>
                </Switch>
            </ThemeProvider>
        </Router>
    );
}
export default App;