export const initialState = {
    order: [],
    restaurant: {
        name: "test"
    },
    tableNumber: 0,
    menu: {
        id: 0,
        name: "Test Menu",
        items: [{
                id: 0,
                name: "test item 1",
                price: 9.99,
                category:"SALAD",
                ingredients:["FISH"]
            },
            {
                id: 1,
                name: "test item 2",
                price: 11.99,
                category:"MAIN",
                ingredients:["MEAT"]
            },
            {
                id: 2,
                name: "test item 3",
                price: 19.00,
                category:"SIDE",
                ingredients:["FISH"],

            },
            {
                id: 3,
                name: "test item 4",
                price: 5.59,
                category:"MAIN",
                ingredients:["SOYA"]
            },
            {
                id: 4,
                name: "test item 5",
                price: 9.00,
                category:"DESSERT",
                ingredients:["SOYA","MILK"]
            },
            {
                id: 5,
                name: "test item 6",
                price: 10.99,
                category:"DESSERT",
                ingredients:["SUGAR"]
            },
            {
                id: 6,
                name: "test beverage 1",
                price: 1.99,
                category:"BEVERAGE",
                ingredients:[]
            },
            {
                id: 7,
                name: "test beverage 1",
                price: 1.99,
                category:"BEVERAGE",
                ingredients:[]
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
            return{
                ...state,
            }
        default:
            return state;
    }

}

export default reducer;