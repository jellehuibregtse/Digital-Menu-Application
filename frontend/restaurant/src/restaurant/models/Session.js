class Session {

    restaurant;
    tableId;
    menus;

    constructor(restaurant, tableId, menus) {
        this.restaurant = restaurant;
        this.tableId = tableId;
        this.menus = menus;
    }
}

export default Session;