import React from 'react';



const TableRowOrders = (props) =>
{
    const {id,items,createdDateTime,tableNumber} = props;
    

    return (
        <tr>
        <th>{id}</th>
        <td>
            <ul>
            {items.map(function (item,i) {
              return <li>{item.name}</li>;
                 })}
                  </ul>
        </td>
        <td>{createdDateTime}</td>
        <td>{tableNumber}</td>
        </tr>
    )
}
export default TableRowOrders;