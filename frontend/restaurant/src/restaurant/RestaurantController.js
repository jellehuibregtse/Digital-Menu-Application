import React from 'react';

class RestaurantController {
    static getName() {
        return "restaurant-name";
    }

    static getTable() {
        // todo: get table number (hardcoded atm)
        return "6";
    }

    static async getDishes() {
        // MenuService.getMenu().then(menu => {
        //     return menu;
        // })
        return ["Salmon"];
    }
}

export default RestaurantController;