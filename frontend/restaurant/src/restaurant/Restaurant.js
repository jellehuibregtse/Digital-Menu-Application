import React from 'react';
import MenuService from "./services/MenuService";

class Restaurant {
    static getName() {
        return "restaurant-name";
    }

    static getTable() {
        // todo: get table number (hardcoded atm)
        return "6";
    }

    static async getMenu() {
        // todo: get categories from menu (hardcoded atm)
        // MenuService.getMenu().then(menu => {
        //     return menu;
        // })
        return ["appetizers", "fish", "meat", "dessert", "cool-drinks", "warm-drinks"];
    }
}

export default Restaurant;