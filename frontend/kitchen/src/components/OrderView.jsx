import OrderColumn from "./OrderColumn";
import React from "react";
import "../css/orderview.css";
import { Droppable } from "react-beautiful-dnd";
import { useState } from "react";


const OrderView = (props) => {
  
  // Dividing menu items to assigned columns

  const {newItems,processingItems,completeItems} = props;
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <Droppable droppableId={"newDishes"}>
            {(provided) => (
              <OrderColumn
                key={1}
                id={1}
                name="New Dishes"
                items={newItems}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                
                {provided.placeholder}
              </OrderColumn>
            )}
          </Droppable>
        </div>

        <div className="col-md-3 col-sm-6">
          <Droppable droppableId={"processingDishes"}>
            {(provided) => (
                <OrderColumn
                    key={2}
                    id={2}
                    name="Preparing Dishes"
                    items={processingItems}
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                >
                  
                  {provided.placeholder}
                </OrderColumn>
            )}
          </Droppable>
        </div>

        <div className="col-md-3 col-sm-6">
          <Droppable droppableId={"completeDishes"}>
            {(provided) => (
                <OrderColumn
                    key={3}
                    id={3}
                    name="Completed Dishes"
                    items={completeItems}
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                >
                  
                  {provided.placeholder}
                </OrderColumn>
            )}
          </Droppable>
        </div>

        {/*<div className="col-md-3 col-sm-6">*/}
        {/*  <OrderColumn*/}
        {/*    key={4}*/}
        {/*    id={3}*/}
        {/*    name={"Orders"}*/}
        {/*    columnType={1}*/}
        {/*    items={props.orders}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default OrderView;
