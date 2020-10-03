import axios from "axios";

const RESTAURANT_PORT = 8081;
const ORDER_PORT = 8083;

class MessagingService {
    static async getRestaurant(id) {
        let result = null;
        await this.tryGetMessage(RESTAURANT_PORT, '/restaurant/get?id=' + id).then(
            (res) => result = res
        ).catch((e) => {throw e})
        return result;
    }

    static async tryGetMessage(port, route) {
        let result = null;
        try {
            await axios.get('http://localhost:' + port + '/api' + route).then(res => {
                result = res.data;
            }).catch(error => {
                if(typeof error.response.data === 'string') {
                    let result = error.response.data.match(/\[(.*?)]/)[1];
                    if(result != null) { throw result } else { throw error.response.data }
                } else
                    throw error.response.data.error;
            });
        } catch(e) {
            throw new Error("Internal Server Error");
        }
        return result;
    }
}

export default MessagingService;