import React from "react";
import "../../css/card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="content">
        <p>
          {props.name} x {props.amount}
        </p>
        <h2> Table number : {props.table}</h2>
      </div>
    </div>
  );
};

export default Card;
