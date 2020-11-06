import React from "react";
import "../../css/card.css";
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components'

const StyledCard = styled.div`

  font-family: 'Oswald', sans-serif;
  
  

`

const Card = (props) => {
  return (
     
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <StyledCard>
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
        </StyledCard>
        
        
        
      )}
    </Draggable>
    
  );
};

export default Card;
