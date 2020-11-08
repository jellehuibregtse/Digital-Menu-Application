import React, {useEffect, useState} from "react";
import "../css/orderview.css";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import DishColumn from "./DishColumn";
import OrderColumn from "./OrderColumn";
import MessagingService from "../services/MessagingService";

const OrderView = (props) => {

  const {restaurantID} = props;

  const [orders, setOrders] = useState([]);

  const OrderStatus = {
    NEW: "NEW",
    PROCESSING: "PROCESSING",
    COMPLETE: "COMPLETE",
  };

  // Get all menu items from all open orders
  const items = [].concat.apply([],orders.map((order) => order.items.map((item, index) => { item.index = index; item.parentId = order.id; item.tableNumber = order.tableNumber; return item; })));
  let newItems = items.filter((item) => item.status === OrderStatus.NEW);
  let processingItems = items.filter((item) => item.status === OrderStatus.PROCESSING);
  let completeItems = items.filter((item) => item.status === OrderStatus.COMPLETE);

  // Run once at runtime
  useEffect(() => {
    MessagingService.register(
        "/orders/" + restaurantID,
        (m) => {setOrders(JSON.parse(m.body))},
        () => {},
        () => {
          MessagingService.fetchHandler("GET", "/order-service/orders/restaurant/" + restaurantID)
              .then((res) => {
                setOrders(res)
              })
              .catch((e) => {
              });
        }
    );
  });

  const onDragEnd = (result) => {
    const {destination, source, draggableId} = result;

    if(!destination)
      return;

    if(source.droppableId === 'orders')
      return;

    if(destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const order = orders.find((order) => order.id === items.find((item) => item.id.toString() === draggableId).parentId);

    if(destination.droppableId === 'newDishes') {
      moveOrder(order, draggableId, OrderStatus.NEW);
    }

    if(destination.droppableId === 'processingDishes') {
      moveOrder(order, draggableId, OrderStatus.PROCESSING);
    }

    if(destination.droppableId === 'completeDishes') {
      moveOrder(order, draggableId, OrderStatus.COMPLETE);
    }
  };

  const moveOrder = (order, draggableId, status) => {
    order.items[items.find((item) => item.id.toString() === draggableId).index].status = status;
    MessagingService.fetchHandler("PUT", "/order-service/orders/" + order.id, order).then().catch(() => {});
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <Droppable droppableId={"newDishes"}>
              {(provided) => (
                  <DishColumn
                      key={1}
                      id={1}
                      name="New Dishes"
                      items={newItems}
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                  >
                    {provided.placeholder}
                  </DishColumn>
              )}
            </Droppable>
          </div>

          <div className="col-md-3 col-sm-6">
            <Droppable droppableId={"processingDishes"}>
              {(provided) => (
                  <DishColumn
                      key={2}
                      id={2}
                      name="Preparing Dishes"
                      items={processingItems}
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                  >
                    {provided.placeholder}
                  </DishColumn>
              )}
            </Droppable>
          </div>

          <div className="col-md-3 col-sm-6">
            <Droppable droppableId={"completeDishes"}>
              {(provided) => (
                  <DishColumn
                      key={3}
                      id={3}
                      name="Completed Dishes"
                      items={completeItems}
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                  >
                    {provided.placeholder}
                  </DishColumn>
              )}
            </Droppable>
          </div>

          <div className="col-md-3 col-sm-6">
            <Droppable droppableId={"orders"}>
              {(provided) => (
                  <OrderColumn
                      key={4}
                      id={4}
                      name="Orders"
                      items={orders}
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                  >
                    {provided.placeholder}
                  </OrderColumn>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default OrderView;