import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = (props) => {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>

          <div className="content">
            <h1>
              {props.name} x {props.quantity}
            </h1>
            <p> Table number : {props.table}</p>
          </div>
        </div>
      )}
    </Draggable>
    
  );
};

export default Card;