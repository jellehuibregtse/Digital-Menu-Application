class Order {

    dishes;
    timeOfOrder;

    constructor(table, restaurantId, dishes, timeOfOrder) {
        this.table = table;
        this.restaurantId = restaurantId;
        this.dishes = dishes;
        this.timeOfOrder = timeOfOrder;
    }

}

export default Order;