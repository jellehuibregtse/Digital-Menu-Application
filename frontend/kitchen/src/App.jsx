import React, { useEffect, useState } from "react";
import "./css/App.css";
import Navbar from "./components/fragments/NavBar";
import OrderView from "./components/OrderView";
import MessagingService from "./services/MessagingService";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CustomCard from "./components/fragments/Card";

// Hardcoded restaurant id
const RESTAURANT_ID = 0;

function App() {
  const [orders, setOrders] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [user] = useState({ name: "user" });

  // Run once at runtime
  useEffect(() => {
    // Subscribe to orders from restaurant
    MessagingService.register(
      "/topic/orders/" + RESTAURANT_ID,
      (m) => setOrders(JSON.parse(m.body)),
      () => {},
      () => {
        MessagingService.fetchHandler("GET", "/orders/")
          .then()
          .catch((e) => {});
      }
    );

    // Get restaurant settings
    MessagingService.fetchHandler("GET", "/restaurants/" + RESTAURANT_ID)
      .then((res) => {
        setRestaurant(res);
      })
      .catch((e) => {});
  }, []);

  const onDragEnd = (result) => {
    console.log("drag");
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <CustomCard></CustomCard>
        <Navbar restaurantName={restaurant.name} userName={user.name} />
        <OrderView orders={orders} />
      </DragDropContext>
    </>
  );
}

export default App;
