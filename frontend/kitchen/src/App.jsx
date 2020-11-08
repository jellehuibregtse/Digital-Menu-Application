import React, { useEffect, useState } from "react";
import "./css/App.css";
import Navbar from "./components/fragments/NavBar";
import OrderView from "./components/OrderView";
import LoginPage from "./components/LoginPage";
import MessagingService from "./services/MessagingService";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

// Hardcoded restaurant id
const RESTAURANT_ID = 0;

const App = () => {
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
        <Switch>
          <Route path="/" exact render={() => (<OrderView orders={orders} count={1}/>)}/>
          <Route path="/login" render={() => (<LoginPage />)}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
