import React from "react";
import Card from "./Card";
import styled from 'styled-components'


const Background = styled.div`
    background-color: #f9f3ed;
`

const DishColumn = (props) => {

    const items = props.items.map((item, index) => {
        return (
            <Card
                id={item.id.toString()}
                key={item.id.toString()}
                index={index}
                name={item.name}
                quantity={item.quantity}
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

export default DishColumn;