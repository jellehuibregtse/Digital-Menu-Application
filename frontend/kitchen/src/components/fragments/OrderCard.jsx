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
            <h1>
              Table : {props.table}
            </h1>
            <ul>
              {props.items.map((item, index) => {
                let listItem =
                    <li key={props.id + "i" + index}>
                      {item.name} x {item.amount}
                    </li>

                // if(item.status === 'COMPLETE')
                // {
                //   listItem.style.color === "green";
                // }

                return listItem;
              })}
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
