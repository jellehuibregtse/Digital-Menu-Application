import React from "react";
import OrderCard from "./OrderCard";

const OrderColumn = (props) => {

    const items = props.items.map((item, index) => {
        return (
            <OrderCard
                id={item.id.toString()}
                key={item.id.toString()}
                index={index}
                items={item.items}
                createdDateTime={item.createdDateTime}
                table={item.tableNumber}
            />
        );
    });

  return (
    <div>
        <div className="main" {...props} ref={props.innerRef}>
          <h2> {props.name}</h2>
          <div className="items">{items}</div>
        </div>
    </div>
  );
};

export default OrderColumn;