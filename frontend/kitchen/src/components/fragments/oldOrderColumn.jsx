import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import TableRowDishes from "./TableRowDishes";
import TableRowOrders from "./TableRowOrders";
import "../../css/ordercolumn.css";

const OrderColumn = (props) => {
  const [popShow, setPopShow] = useState(false);

  const handleClose = () => {
    setPopShow(false);
  };

  const handlePopup = () => {
    setPopShow(true);
  };

  console.log(props);
  // Check if valid column type
  if (!(props.columnType >= 0 && props.columnType <= 1)) {
    return null;
  }

  // Generating dishes and orders according to column type
  // type 0: dishes
  // type 1: orders

  const items =
    props.items.length > 0
      ? props.items.map((item, index) => {
          //console.log(item);
          return (
            <React.Fragment>
              {props.columnType === 0 ? (
                <>
                  <TableRowDishes
                    key={item.id.toString()}
                    index={index}
                    id={item.id.toString()}
                    amount={item.amount}
                    name={item.name}
                    table={item.table}
                  />
                </>
              ) : (
                <>
                  {item.items.length > 0 ? (
                    <>
                      <TableRowOrders
                        key={item.id.toString()}
                        index={index}
                        id={item.id.toString()}
                        items={item.items}
                        createdDateTime={item.createdDateTime}
                        tableNumber={item.tableNumber}
                      />
                    </>
                  ) : null}
                </>
              )}
            </React.Fragment>
          );
        })
      : null;

  return (
    <>
      <h5 id="title-column">{props.name}</h5>
      <table className="table table-hover" {...props} ref={props.innerRef}>
        <thead className="thead-dark">
          <tr>
            {props.columnType === 0 ? (
              <>
                <th scope="col">Amount</th>
                <th scope="col">Dish Name</th>
                <th scope="col">Table</th>
              </>
            ) : (
              <>
                <th scope="col">Order Number</th>
                <th scope="col">Items</th>
                <th scope="col">Time</th>
                <th scope="col">Table</th>
              </>
            )}
          </tr>
        </thead>
        <tbody onClick={handlePopup}>{items}</tbody>
      </table>

      {/* <Modal show={popShow} onHide={handleClose} onRequestClose={handleClose} id="modal">
                <Modal.Header closeButton>
                  <Modal.Title>Heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Body</Modal.Body>
                <Modal.Footer>Footer</Modal.Footer>
              </Modal> */}
    </>
  );
};

export default OrderColumn;
