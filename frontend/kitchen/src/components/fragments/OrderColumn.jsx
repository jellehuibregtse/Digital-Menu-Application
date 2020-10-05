import React from "react";

const OrderColumn = (props) => {
    // Check if valid column type
    if(!(props.columnType >= 0 && props.columnType <= 1)) { return null; }

    // Generating dishes and orders according to column type
    // type 0: dishes
    // type 1: orders
    const items = props.items.length > 0? props.items.map((item) => {
        return (
            <tbody>
                <tr>
                    {props.columnType === 0? <>
                        <th>{item.amount}</th>
                        <td>{item.name}</td>
                        <td>{item.table}</td>
                    </> : <>
                        <th>{item.id}</th>
                        <td>
                            <ul>
                                {item.items.map(function (item) {
                                    return <li>{item.name}</li>;
                                })}
                            </ul>
                        </td>
                        <td>{item.createdDateTime}</td>
                        <td>{item.tableNumber}</td>
                    </>}
                </tr>
            </tbody>
        )
    }): null;

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
