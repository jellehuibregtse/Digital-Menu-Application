import React, {useEffect, useState} from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import Dish from "./components/Dish";
import Order from "./components/Order";

function App() {
    const [Dishes, setDishes] = useState([]);
    const [Orders, setOrders] = useState([]);

    //runs once at runtime, that's what the [] at the end are for.
    useEffect(() => {
        // fetch("url")
        // .then(data =>{
        //   setDishes(data);
        // })
        //setRestaurant()
    }, []);

    //The Dish/Order Components are designed to take arrays for the dishes/orders props and display them accordingly
    return (
        <div className="main">
            <div className="Navbar">
                <Navbar/>
            </div>
            <div className="App">
                <div className="box1 newDishes">
                    New Dishes
                    <Dish
                        dishes={[
                            {
                                id: 0,
                                numberOfDish: 1,
                                dishName: "Pizza",
                                dishTable: 5,
                            },
                            {
                                id: 1,
                                numberOfDish: 1,
                                dishName: "Pasta",
                                dishTable: 10,
                            },
                            {
                                id: 2,
                                numberOfDish: 3,
                                dishName: "Fish Fingers",
                                dishTable: 3,
                            },
                        ]}
                    />
                </div>
                <div className="box2 preparingDishes">
                    Preparing Dishes
                    <Dish
                        numberOfDish="1"
                        dishName="Pasta Bolognese"
                        dishTable="Table 11"
                    />
                </div>
                <div className="box3 completedDishes">
                    Completed Dishes
                    <Dish
                        numberOfDish="2"
                        dishName="Vanilla Ice Cream"
                        dishTable="Table 2"
                    />
                </div>
                <div className="box4 orders">
                    Orders
                    <Order
                        orders={[
                            {
                                id: 0,
                                tableNumber: 1,
                                orderNumber: 12,
                                time: 5,
                                items: [
                                    {
                                        name: "Pizza",
                                        numberOfDish: 3,
                                    },
                                ],
                            },
                            {
                                id: 1,
                                tableNumber: 3,
                                orderNumber: 10,
                                time: 5,
                                items: [
                                    {
                                        name: "Fish n Chips",
                                        numberOfDish: 1,
                                    },
                                    {
                                        name: "Mashed Potatoes",
                                        numberOfDish: 3,
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
