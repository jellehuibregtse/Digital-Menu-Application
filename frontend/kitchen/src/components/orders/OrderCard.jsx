import React from "react";
import {Draggable} from "react-beautiful-dnd";

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
            <h1>
              Table : {props.table}
            </h1>
            <ul>
              {props.items.map((item, index) =>
                <li style={item.status === 'COMPLETE'? {color: 'green'} : null} key={props.id + "i" + index}>
                  {item.name} x {item.quantity}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;