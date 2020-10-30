import React from "react";
import Card from "./fragments/Card";

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
        <div className="main" {...props} ref={props.innerRef}>
            <h4> {props.name}</h4>
            <div className="items">{items}</div>
        </div>
    );
};

export default DishColumn;