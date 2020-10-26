import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const TableRowDishes = (props) => {
  console.log(props);
  const { amount, name, table } = props;

  const Row = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    margin-top: 1px;
  `;

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        // <Container
        //   {...provided.draggableProps}
        //   {...provided.dragHandleProps}
        //   ref={provided.innerRef}
        // >

        <tr
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <th>{amount}</th>
          <td>{name}</td>
          <td>{table}</td>
          {/* </Container> */}
        </tr>
      )}
    </Draggable>
  );
};

export default TableRowDishes;
