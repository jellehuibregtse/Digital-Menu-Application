export const initialState = {
    order: [],
    restaurant: {
        name: "test",
        id: 0
    },
    tableNumber: 0,
    menu: {
        id: 0,
        name: "Test Menu",
        // items: [{
        //         id: 0,
        //         name: "test item 1",
        //         price: 9.99,
        //         category:"SALAD",
        //         ingredients:["FISH"]
        //     },
        //     {
        //         id: 1,
        //         name: "test item 2",
        //         price: 11.99,
        //         category:"MAIN",
        //         ingredients:["MEAT"]
        //     },
        //     {
        //         id: 2,
        //         name: "test item 3",
        //         price: 19.00,
        //         category:"SIDE",
        //         ingredients:["FISH"],

        //     },
        //     {
        //         id: 3,
        //         name: "test item 4",
        //         price: 5.59,
        //         category:"MAIN",
        //         ingredients:["SOYA"]
        //     },
        //     {
        //         id: 4,
        //         name: "test item 5",
        //         price: 9.00,
        //         category:"DESSERT",
        //         ingredients:["SOYA","MILK"]
        //     },
        //     {
        //         id: 5,
        //         name: "test item 6",
        //         price: 10.99,
        //         category:"DESSERT",
        //         ingredients:["MILK"]
        //     },
        //     {
        //         id: 6,
        //         name: "test beverage 1",
        //          price: 1.99,
        //         category:"BEVERAGE",
        //         ingredients:[]
        //     },
        //     {
        //         id: 7,
        //         name: "test beverage 1",
        //         price: 1.99,
        //         category:"BEVERAGE",
        //         ingredients:[ ]
        //     }

        //]
        "items": [{
                "id": 4,
                "name": "Steak",
                "price": 12.99,
                "category": {
                    "id": 2,
                    "name": "Main Dishes"
                },
                "ingredients": [{
                    "id": 5,
                    "name": "Meat"
                }]
            },
            {
                "id": 6,
                "name": "Fanta 330ml",
                "price": 1.99,
                "category": {
                    "id": 3,
                    "name": "Beverages"
                },
                "ingredients": []
            },
            {
                "id": 7,
                "name": "Salmon with fries",
                "price": 15.99,
                "category": {
                    "id": 2,
                    "name": "Main Dishes"
                },
                "ingredients": [{
                    "id": 8,
                    "name": "Fish"
                }]
            },
            {
                "id": 9,
                "name": "Lipton 330ml",
                "price": 1.99,
                "category": {
                    "id": 3,
                    "name": "Beverages"
                },
                "ingredients": []
            }
        ],

        "categories": [{
                "id": 2,
                "name": "Main Dishes"
            },
            {
                "id": 3,
                "name": "Beverages"
            }
        ]
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case "Add to cart":

            let updatedOrder = [...state.order, action.item];
            return {
                ...state,
                order: updatedOrder
            }


            case "Remove from cart":
                let index = state.order.findIndex(item => item.name === action.item.name)

                state.order.splice(index, 1);
                return {
                    ...state
                }

                case "Clear cart":
                    state.order = [];
                    return {
                        ...state,
                    }
                    default:
                        return state;
    }

}

export default reducer;