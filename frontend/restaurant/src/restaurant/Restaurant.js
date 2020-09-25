import React from 'react';

class Restaurant {
    static getName() {
        return "restaurant-name";
    }

    static getTable() {
        // todo: get table number (hardcoded atm)
        return "6";
    }

    static getMenu() {
        // todo: get categories from menu (hardcoded atm)
        return ["appetizers", "fish", "meat", "dessert", "cool-drinks", "warm-drinks"];
    }
}

export default Restaurant;