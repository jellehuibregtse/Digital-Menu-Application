import React, { useEffect, useState } from "react";
import "./css/App.css";
import Navbar from "./components/fragments/NavBar";
import OrderView from "./components/OrderView";
import MessagingService from "./services/MessagingService";
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom";
import Account from "../../admin-panel/src/components/account/Account";

// Hardcoded restaurant id
const RESTAURANT_ID = 0;

const App = () => {
  const loggedIn = localStorage.getItem('token');

  const [restaurant, setRestaurant] = useState({});
  const [orders, setOrders] = useState([]);
  const [user] = useState({ name: "user" });

  // Run once at runtime
  useEffect(() => {
    async function fetchOrders() {
      await MessagingService.fetchHandler("GET", "/restaurant-service/restaurants/" + RESTAURANT_ID)
          .then((res) => {
            setRestaurant(res);
          })
          .catch(() => {});

      await MessagingService.register(
          "/orders/" + RESTAURANT_ID,
          (m) => {setOrders(JSON.parse(m.body))},
          () => {},
          () => {
            MessagingService.fetchHandler("GET", "/order-service/orders/restaurant/" + RESTAURANT_ID)
                .then((res) => {
                  setOrders(res);
                })
                .catch(() => {
                });
          }
      );
    }
    fetchOrders();
  }, []);

  return (
    <>
      <Router>
        <Navbar restaurantName={restaurant.name} userName={user.name}/>
        {loggedIn?
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
      </Router>
    </>
  );
}

export default App;
