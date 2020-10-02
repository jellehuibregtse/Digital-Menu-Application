import axios from 'axios';

const ORDER_SERVICE_URL = 'http://localhost:8081/';

class OrderService {
    static async placeOrder(order) {
        let result;
        try {
            await axios.post(ORDER_SERVICE_URL + 'place-order', order).then(res => {
                result = res;
            }).catch(error => {
                if(typeof error.response.data === 'string') {
                    result = error.response.data.match(/\[(.*?)\]/)[1];
                    if(result == null) { result = error.response.data }
                } else {
                    result = error.response.data.error;
                }
            });
        } catch(e) {
            result = 'Internal Server Error';
        }
        return result;
    }
}

export default OrderService;