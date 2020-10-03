import axios from "axios";

const RESTAURANT_SERVICE_URL = "http://localhost:8090/api/order";

class RestaurantService {
    static async getRestaurant(restaurantId) {
        let result;
        try {
            await axios.get(RESTAURANT_SERVICE_URL + "get", restaurantId).then(res => {
                result = res;
            }).catch(error => {
                if (typeof error.response.data === "string") {
                    result = error.response.data.match(/\[(.*?)]/)[1];
                    if (result == null) {
                        result = error.response.data;
                    }
                } else {
                    result = error.response.data.error;
                }
            });
        } catch (e) {
            result = "Internal Server Error";
        }
        return result;
    }
}

export default RestaurantService;