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

  // Get all menu items from all open orders
  const items = [].concat.apply(
    [],
    orders.map((order) => {
      return order.items.map((item) => {
        item.table = order.tableNumber;
        return item;
      });
    })
  );

  const OrderStatus = {
  NEW: "NEW",
  PROCESSING: "PROCESSING",
  COMPLETE: "COMPLETE",
};

  let newItems = items.filter((item) => item.status === OrderStatus.NEW);
  let processingItems = items.filter(
    (item) => item.status === OrderStatus.PROCESSING
  );
  let completeItems = items.filter(
    (item) => item.status === OrderStatus.COMPLETE
  );

  console.log(items);
  const onDragEnd = (result) => {
    //console.log("drag");
    const {destination, source, draggableId} = result;

    if(!destination)
    return;

    if(destination.droppableId === source.droppableId
      &&
      destination.index === source.index
      )
      return;

    let startItems = [];
    let finalItems = [];
    if(source.droppableId === 'newDishes')
    {startItems = Array.from(newItems);}
    if(source.droppableId === 'prepDishes')
    startItems = Array.from(processingItems);

    if(source.droppableId === 'compDishes')
    startItems = Array.from(completeItems);

    if(destination.droppableId === 'newDishes')
    finalItems = Array.from(newItems);

    if(destination.droppableId === 'prepDishes')
    finalItems = Array.from(processingItems);

    if(destination.droppableId === 'compDishes')
    finalItems = Array.from(completeItems);



    let dropelement = startItems.splice(source.index,1);
    finalItems.splice(destination.index,0,dropelement[0]);


    if(source.droppableId === 'newDishes')
    newItems = Array.from(startItems);

    if(source.droppableId === 'prepDishes')
    processingItems = Array.from(startItems);

    if(source.droppableId === 'compDishes')
    completeItems = Array.from(startItems);

    if(destination.droppableId === 'newDishes')
    {newItems = Array.from(finalItems);}
    //console.log(newItems);}

    if(destination.droppableId === 'prepDishes')
    {processingItems = Array.from(finalItems);}
    //console.log(processingItems);

    if(destination.droppableId === 'compDishes')
    {completeItems = Array.from(finalItems);}
    //console.log(finalItems);
    

    //console.log(result)
    
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Navbar restaurantName={restaurant.name} userName={user.name} />
        <OrderView 
        orders={orders}
        newItems = {newItems}
        processingItems = {processingItems}
        completeItems = {completeItems}
        
        />
      </DragDropContext>
    </>
  );
}

export default App;
