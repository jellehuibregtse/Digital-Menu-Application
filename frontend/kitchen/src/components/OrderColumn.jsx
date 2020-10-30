import React from "react";
import Card from "./fragments/Card";
import "../css/ordercolumn.css";

const OrderColumn = (props) => {

  return (
    <div className="main" {...props} ref={props.innerRef}>
      <h4> {props.name}</h4>
      <div className="items"/>
    </div>
  );
};

export default OrderColumn;