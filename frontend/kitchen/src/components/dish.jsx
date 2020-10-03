import React from "react";

const Dish = (props) => {
    //console.log(props.dishes);

    if (props.dishes) {
        var dishes = props.dishes.map(function (value, i) {
            return (
                <tbody>
                <tr>
                    <th scope="row">{value.numberOfDish}</th>
                    <td>{value.dishName}</td>
                    <td>{value.dishTable}</td>
                </tr>
                </tbody>
            );
        });
    }

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

                {dishes}
            </table>
        </div>
    );
};

export default Dish;
