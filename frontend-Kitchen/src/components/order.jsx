import React from "react";

const order = (props) => {
  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Table #</th>
            <th scope="col">Table Number</th>
            <th scope="col">Time</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td scope="row">Test Food</td>
            <td scope="row">Test 2</td>
            <td scope="row">Test 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default order;
