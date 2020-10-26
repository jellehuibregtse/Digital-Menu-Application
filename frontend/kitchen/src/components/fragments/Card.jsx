import React from "react";
import "../../css/card.css";
import { Draggable } from "react-beautiful-dnd";

const Card = (props) => {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="content">
            <p>
              {props.name} x {props.amount}
            </p>
            <h2> Table number : {props.table}</h2>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
