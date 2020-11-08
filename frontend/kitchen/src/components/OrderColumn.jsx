import React from "react";
import OrderCard from "./fragments/OrderCard";
import styled from 'styled-components';
import '../css/columns.css';

const Background = styled.div`
    background-color: #f9f3ed;
`

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
    <Background>
        <div className="main" {...props} ref={props.innerRef}>
          <h2> {props.name}</h2>
          <div className="items">{items}</div>
        </div>
    </Background>
  );
};

export default OrderColumn;