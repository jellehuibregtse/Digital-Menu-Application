import React from "react";
import "../css/orderview.css";
import { Droppable } from "react-beautiful-dnd";
import DishColumn from "./DishColumn";
import OrderColumn from "./OrderColumn";

const OrderView = (props) => {

  const {newItems,processingItems,completeItems,orders} = props;
  
  return (
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
          <Droppable droppableId={"completeDishes"}>
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
  );
};

export default OrderView;