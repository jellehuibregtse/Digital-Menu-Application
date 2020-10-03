import React from "react";

const OrderColumn = (props) => {
    if(!(props.columnType >= 0 && props.columnType <= 1)) { return null; }
    let items;

    if (props.items) {
        items = props.items.map(function (item) {
            if(props.columnType === 0) {
                return (
                    <tbody>
                    <tr>
                        <th>{item.amount}</th>
                        <td>{item.name}</td>
                        <td>{item.time}</td>
                    </tr>
                    </tbody>
                );
            } else {
                return (
                    <tbody>
                    <tr>
                        <th>{item.number}</th>
                        <td>
                            <ul>
                                {item.items.map(function (item) {
                                    return <li>{item.name + "  " + item.amount}</li>;
                                })}
                            </ul>
                        </td>
                        <td>{item.time}</td>
                        <td>{item.table}</td>
                    </tr>
                    </tbody>
                );
            }
        });
    }

    return (
        <>
            <h5>{props.name}</h5>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        {props.columnType === 0?
                            <>
                                <th scope="col">Amount</th>
                                <th scope="col">Dish Name</th>
                                <th scope="col">Table</th>
                            </> :
                            <>
                                <th scope="col">Order Number</th>
                                <th scope="col">Items</th>
                                <th scope="col">Time</th>
                                <th scope="col">Table</th>
                            </>
                        }
                    </tr>
                </thead>

                {items}
            </table>
        </>
    );
};

export default OrderColumn;
