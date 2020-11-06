import React from "react";
import OrderCard from "./fragments/OrderCard";
import "../css/ordercolumn.css";

const OrderColumn = (props) => {

    const items = props.items.map((item, index) => {
        return (
            <React.Fragment>
                <OrderCard
                    id={item.id.toString()}
                    key={item.id.toString()}
                    index={index}
                    items={item.items}
                    createdDateTime={item.createdDateTime}
                    table={item.tableNumber}
                />
            </React.Fragment>
        );
    });

  return (
    <div className="main" {...props} ref={props.innerRef}>
      <h4> {props.name}</h4>
      <div className="items">{items}</div>
    </div>
  );
};

export default OrderColumn;