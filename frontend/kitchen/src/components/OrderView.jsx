import OrderColumn from "./fragments/OrderColumn";
import React from "react";
import "../css/ordercolumn.css";

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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          
          <OrderColumn name={"New Dishes"} columnType={0} items={newItems} />{" "}
          
        </div>

        <div className="col-md-3 col-sm-6">
          
          <OrderColumn
            name={"Preparing Dishes"}
            columnType={0}
            items={processingItems}
          />
          
        </div>

        <div className="col-md-3 col-sm-6">
          
          <OrderColumn
            name={"Completed Dishes"}
            columnType={0}
            items={completeItems}
          />
          
        </div>

        <div className="col-md-3 col-sm-6">
          
          <OrderColumn name={"Orders"} columnType={1} items={props.orders} />
          
        </div>
      </div>
    </div>
  );
};

export default OrderView;
