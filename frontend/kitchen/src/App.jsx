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
  const [user] = useState({ name: "user" });

  // Run once at runtime
  useEffect(() => {
    // Get restaurant settings
    MessagingService.fetchHandler("GET", "/restaurant-service/restaurants/" + RESTAURANT_ID)
      .then((res) => {
        setRestaurant(res);
      })
      .catch((e) => {});
  }, []);

  return (
    <>
      <Router>
        <Navbar restaurantName={restaurant.name} userName={user.name}/>
        <Switch>
          <Route path="/" exact render={() => (<OrderView restaurantID={RESTAURANT_ID}/>)}/>
          <Route path="/login" render={() => (<LoginPage />)}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
