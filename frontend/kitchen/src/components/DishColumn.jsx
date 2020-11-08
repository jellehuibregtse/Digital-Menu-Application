import React from "react";
import Card from "./fragments/Card";
import styled from 'styled-components'

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

const DishColumn = (props) => {

    const items = props.items.map((item, index) => {
        return (
            <React.Fragment>
                <Card
                    id={item.id.toString()}
                    key={item.id.toString()}
                    index={index}
                    name={item.name}
                    amount={item.amount}
                    table={item.table}
                />
            </React.Fragment>
        );
    });

    return (
        <Background>
        <div className="main"
         {...props} 
         ref={props.innerRef}
         
         >
            <Style>
            <p> {props.name}</p>
            </Style>
            <div className="items">{items}</div>
            
        </div>
        </Background>
    );
};

export default DishColumn;