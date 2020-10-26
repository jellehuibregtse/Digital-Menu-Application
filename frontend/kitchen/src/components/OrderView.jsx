import OrderColumn from "./OrderColumn";
import React from "react";
import "../css/orderview.css";
import { Droppable } from "react-beautiful-dnd";

const OrderStatus = {
  NEW: "NEW",
  PROCESSING: "PROCESSING",
  COMPLETE: "COMPLETE",
};

const OrderView = (props) => {
  // Get all menu items from all open orders
  const items = [].concat.apply(
    [],
    props.orders.map((order) => {
      return order.items.map((item) => {
        item.table = order.tableNumber;
        return item;
      });
    })
  );

  // Dividing menu items to assigned columns
  const newItems = items.filter((item) => item.status === OrderStatus.NEW);
  const processingItems = items.filter(
    (item) => item.status === OrderStatus.PROCESSING
  );
  const completeItems = items.filter(
    (item) => item.status === OrderStatus.COMPLETE
  );

  return (
    // <div className="container-fluid">
    //   <div className="row">
    //     <div className="col-md-3 col-sm-6">
    //       <Droppable droppableId={"0"}>
    //         {(provided) => (
    //           <OrderColumn
    //             innerRef={provided.innerRef}
    //             {...provided.droppableProps}
    //             key={0}
    //             id={0}
    //             name={"New Dishes"}
    //             columnType={0}
    //             items={newItems}
    //           >
    //             {" "}
    //             {provided.placeholder}{" "}
    //           </OrderColumn>
    //         )}
    //       </Droppable>
    //     </div>

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <Droppable droppableId={"0"}>
            {(provided) => (
              <OrderColumn
                key={0}
                id={0}
                name="New Dishes"
                items={newItems}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {" "}
                {provided.placeholder}{" "}
              </OrderColumn>
            )}
          </Droppable>
        </div>

        <div className="col-md-3 col-sm-6">
          <OrderColumn
            key={2}
            id={1}
            name={"Preparing Dishes"}
            columnType={0}
            items={processingItems}
          />
        </div>

        <div className="col-md-3 col-sm-6">
          <OrderColumn
            id={2}
            key={3}
            name={"Completed Dishes"}
            columnType={0}
            items={completeItems}
          />
        </div>

        <div className="col-md-3 col-sm-6">
          <OrderColumn
            key={4}
            id={3}
            name={"Orders"}
            columnType={1}
            items={props.orders}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderView;
