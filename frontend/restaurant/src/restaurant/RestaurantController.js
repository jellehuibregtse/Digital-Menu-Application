import React from 'react';
import MenuService from "./services/MenuService";

class RestaurantController {
    static getName() {
        return "restaurant-name";
    }

    static getTable() {
        // todo: get table number (hardcoded atm)
        return "6";
    }

    static async getMenu(restaurantId) {
        MenuService.getAllMenus(restaurantId).then(

        )
        return ["appetizers", "fish", "meat", "dessert", "cool-drinks", "warm-drinks"];
    }

    static async getDishes() {
        // MenuService.getMenu().then(menu => {
        //     return menu;
        // })
        return ["Salmon"];
    }
}

export default RestaurantController;