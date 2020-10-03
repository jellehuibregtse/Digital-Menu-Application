import OrderColumn from "./fragments/OrderColumn";
import React from "react";

const OrderView = (props) => {
    return(
        <div className="orderView">
            <div className="column">
                <OrderColumn name={"New Dishes"} columnType={0}
                    items={[
                        {
                            id: 0,
                            amount: 1,
                            name: "Pizza",
                            time: 5,
                            table: 5,
                        },
                        {
                            id: 1,
                            amount: 1,
                            name: "Pasta",
                            time: 10,
                            table: 10,
                        },
                        {
                            id: 2,
                            amount: 3,
                            name: "Fish Fingers",
                            time: 3,
                            table: 3,
                        },
                    ]}
                />
            </div>
            <div className="column">
                <OrderColumn name={"Preparing Dishes"} columnType={0}
                    items={[
                        {
                            id: 3,
                            amount: 1,
                            name: "Pasta Bolognese",
                            time: 11,
                            table: 11,
                        }
                    ]}
                />
            </div>
            <div className="column">
                <OrderColumn name={"Completed Dishes"} columnType={0}
                    items={[
                        {
                            id: 4,
                            amount: 2,
                            name: "Vanilla Ice Cream",
                            time: 2,
                            table: 2,
                        }
                    ]}
                />
            </div>
            <div className="column">
                <OrderColumn name={"Orders"} columnType={1}
                    items={[
                        {
                            id: 0,
                            table: 1,
                            number: 12,
                            time: 5,
                            items: [
                                {
                                    name: "Pizza",
                                    amount: 3,
                                },
                            ],
                        },
                        {
                            id: 1,
                            table: 3,
                            number: 10,
                            time: 5,
                            items: [
                                {
                                    name: "Fish n Chips",
                                    amount: 1,
                                },
                                {
                                    name: "Mashed Potatoes",
                                    amount: 3,
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default OrderView;