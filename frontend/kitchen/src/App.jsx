import React, { useEffect, useState } from "react";
import "./css/App.css";
import Navbar from "./components/fragments/NavBar";
import OrderView from "./components/OrderView";
import MessagingService from "./services/MessagingService";
import { DragDropContext } from "react-beautiful-dnd";

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
      (m) => {setOrders(JSON.parse(m.body))},
      () => {},
      () => {
        MessagingService.fetchHandler("GET", "/orders")
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

  const OrderStatus = {
    NEW: "NEW",
    PROCESSING: "PROCESSING",
    COMPLETE: "COMPLETE",
  };

  // Get all menu items from all open orders
  const items = [].concat.apply([],orders.map((order) => { return order.items.map((item, index) => { item.index = index; item.parentId = order.id; item.table = order.tableNumber; return item; }); }));
  let newItems = items.filter((item) => item.status === OrderStatus.NEW);
  let processingItems = items.filter((item) => item.status === OrderStatus.PROCESSING);
  let completeItems = items.filter((item) => item.status === OrderStatus.COMPLETE);

  const onDragEnd = (result) => {
    const {destination, source, draggableId} = result;

    if(!destination)
      return;
    
    // if(source.droppableId === 'orders' || destination.droppableId === 'orders')
    //   return;

    if(destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const order = orders.find((order) => order.id === items.find((item) => item.id.toString() === draggableId).parentId);

    if(destination.droppableId === 'newDishes') {
      order.items[items.find((item) => item.id.toString() === draggableId).index].status = OrderStatus.NEW;
      MessagingService.fetchHandler("PUT", "/orders", order).then().catch((e) => {});
    }

    if(destination.droppableId === 'processingDishes') {
      order.items[items.find((item) => item.id.toString() === draggableId).index].status = OrderStatus.PROCESSING;
      MessagingService.fetchHandler("PUT", "/orders", order).then().catch((e) => {});
    }

    if(destination.droppableId === 'completeDishes') {
      order.items[items.find((item) => item.id.toString() === draggableId).index].status = OrderStatus.COMPLETE;
      MessagingService.fetchHandler("PUT", "/orders", order).then().catch((e) => {});
    }
  };


  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Navbar restaurantName={restaurant.name} userName={user.name}/>
        <OrderView orders={orders} newItems = {newItems} processingItems = {processingItems} completeItems = {completeItems}/>
      </DragDropContext>
    </>
  );
}

export default App;
