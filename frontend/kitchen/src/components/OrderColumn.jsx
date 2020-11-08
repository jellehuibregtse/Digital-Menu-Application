import React from "react";
import OrderCard from "./fragments/Card";
import styled from 'styled-components'
import '../css/columns.css'

const Style= styled.div`
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    margin-top: 2vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`
const Background = styled.div`

    background-color: #f9f3ed;
`

const OrderColumn = (props) => {

    const items = props.items.map((item, index) => {
        return (
            <React.Fragment>
                <OrderCard
                    id={item.id.toString()}
                    key={item.id.toString()}
                    index={index}
                    items={item.items}
                    createdDateTime={item.createdDateTime}
                    tableNumber={item.tableNumber}
                />
            </React.Fragment>
        );
    });

  return (
    <Background>
    <div className="main" {...props} ref={props.innerRef}>
      <Style>
      <h4> {props.name}</h4>
      </Style>
      <div className="items"/>
    </div>
    </Background>
  );
};

export default OrderColumn;