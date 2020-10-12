import { Modal } from "react-bootstrap";
import React, { useState } from "react";

const OrderColumn = (props) => {
  const [popShow, setPopShow] = useState(false);

  const handleClose = () => {
    setPopShow(false);
  };

  const handlePopup = () => {
    setPopShow(true);
  };

  // Check if valid column type
  if (!(props.columnType >= 0 && props.columnType <= 1)) {
    return null;
  }

  // Generating dishes and orders according to column type
  // type 0: dishes
  // type 1: orders

  const items =
    props.items.length > 0
      ? props.items.map((item) => {
          console.log(item);
          return (
            <div>
              <tbody
                onClick={() => {
                  handlePopup();
                }}
              >
                <tr>
                  {props.columnType === 0 ? (
                    <>
                      <th>{item.amount}</th>
                      <td>{item.name}</td>
                      <td>{item.table}</td>
                    </>
                  ) : (
                    <>
                      {item.items.length > 0 ? (
                        <>
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
                        </>
                      ) : null}
                    </>
                  )}
                </tr>
              </tbody>

              <Modal show={popShow} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Body</Modal.Body>
                <Modal.Footer>Footer</Modal.Footer>
              </Modal>
            </div>
          );
        })
      : null;

  return (
    <>
      <h5 id="title-column">{props.name}</h5>
      <table className="table table-hover">
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
        {items}
      </table>
    </>
  );
};

export default OrderColumn;
