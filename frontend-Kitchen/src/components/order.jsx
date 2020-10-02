import React from "react";

const order = (props) => {
  if (props.orders) {
    var orders = props.orders.map(function (value, i) {
      return (
        <tbody>
          <tr>
            <th scope="row col-md-2">{value.tableNumber}</th>
            <td>{value.orderNumber}</td>
            <td>
              <ul>
                {value.items.map(function (value, i) {
                  return <li>{value.name + "  " + value.numberOfDish}</li>;
                })}
              </ul>
            </td>
            <td>{value.time}</td>
          </tr>
        </tbody>
      );
    });
  }
  return (
    <div>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Table #</th>
            <th scope="col">Order Number</th>
            <th scope="col">Items</th>
            <th scope="col">Time</th>
          </tr>
        </thead>

        {orders}
      </table>
    </div>
  );
};

export default order;
