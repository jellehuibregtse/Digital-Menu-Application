import OrderColumn from "./fragments/OrderColumn";
import React from "react";

const OrderStatus = {
    NEW: "NEW",
    PROCESSING: "PROCESSING",
    COMPLETE: "COMPLETE"
}

const OrderView = (props) => {
    // getting all menu items
    const menuItems = [].concat.apply([], props.orders.map((order) => { return order.menuItems.map((menuItem) => { menuItem.table = order.tableNumber; menuItem.amount = 1; return menuItem; })}));

    // ordering menu items to the columns
    const newItems = menuItems.filter(item => item.status === OrderStatus.NEW);
    const processingItems = menuItems.filter(item => item.status === OrderStatus.PROCESSING);
    const completeItems = menuItems.filter(item => item.status === OrderStatus.COMPLETE);

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