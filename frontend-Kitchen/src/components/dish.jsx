import React from "react";

const dish = (props) => {
  return (
    <div className="dish">
      <table className="table table-hover table responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col"># of</th>
            <th scope="col">Dish Name</th>
            <th scope="col">Table</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row">{props.numberOfDish}</th>
            <td>{props.dishName}</td>
            <td>{props.dishTable}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default dish;
