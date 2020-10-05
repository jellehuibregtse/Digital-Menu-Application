import OrderColumn from "./fragments/OrderColumn";
import React from "react";

const OrderStatus = {
    NEW: "NEW",
    PROCESSING: "PROCESSING",
    COMPLETE: "COMPLETE"
}

const OrderView = (props) => {
    // Get all menu items from all open orders
    const items = [].concat.apply([], props.orders.map((order) => { return order.items.map((item) => { item.table = order.tableNumber; return item; })}));

    // Dividing menu items to assigned columns
    const newItems = items.filter(item => item.status === OrderStatus.NEW);
    const processingItems = items.filter(item => item.status === OrderStatus.PROCESSING);
    const completeItems = items.filter(item => item.status === OrderStatus.COMPLETE);

    return(
        <div className="orderView">
            <div className="column"><OrderColumn name={"New Dishes"} columnType={0} items={newItems}/> </div>
            <div className="column"><OrderColumn name={"Preparing Dishes"} columnType={0} items={processingItems}/></div>
            <div className="column"><OrderColumn name={"Completed Dishes"} columnType={0} items={completeItems}/></div>
            <div className="column"><OrderColumn name={"Orders"} columnType={1} items={props.orders}/></div>
        </div>
    )
}

export default OrderView;