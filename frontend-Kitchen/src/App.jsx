import React from "react";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import Dish from "./components/dish.jsx";
import Order from "./components/order.jsx";

function App() {
  return (
    <div className="main">
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="App">
        <div className="box1">
          New Dishes
          <Dish numberOfDish="1" dishName="Pizza Salami" dishTable="Table 7" />
        </div>
        <div className="box2">
          Preparing Dishes
          <Dish
            numberOfDish="1"
            dishName="Pasta Bolognese"
            dishTable="Table 11"
          />
        </div>
        <div className="box3">
          Completed Dishes
          <Dish
            numberOfDish="2"
            dishName="Vanilla Ice Cream"
            dishTable="Table 2"
          />
        </div>
        <div className="box4">
          Orders
          <Order />
        </div>
      </div>
    </div>
  );
}

export default App;
