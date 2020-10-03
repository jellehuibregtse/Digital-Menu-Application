import axios from "axios";

const ORDER_SERVICE_URL = "http://localhost:8090/api/order";

class OrderService {
    static async getAllOrders(restaurantId) {
        let result;
        try {
            await axios.get(ORDER_SERVICE_URL + "getAll", restaurantId).then(res => {
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

export default OrderService;