import axios from "axios";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const RESTAURANT_PORT = 8081;
const ORDER_PORT = 8083;

class MessagingService {
    static async getRestaurant(id) {
        let result = null;
        await this.tryGetMessage(RESTAURANT_PORT, '/restaurants/' + id).then(
            (res) => result = res
        ).catch((e) => {throw e})
        return result;
    }

    static async tryGetMessage(port, route) {
        let result = null;
        await axios.get('http://localhost:' + port + '/api' + route).then(res => {
            result = res.data;
        }).catch(error => this.throwError(error));
        return result;
    }

    static register(route, onMessage, onClose, onConnect) {
        let socket = new SockJS('http://localhost:' + ORDER_PORT + '/api/websockets');
        let stompClient = Stomp.over(socket);
        stompClient.debug = null;
        socket.onclose = onClose();
        stompClient.connect({}, function() {
            stompClient.subscribe(route, onMessage);
            onConnect();
        });
    }

    static throwError(error) {
        if(error.response != null) {
            if(typeof error.response.data === 'string') {
                let result = error.response.data.match(/\[(.*?)]/);
                if(result !== null) { throw result[1] } else { throw error.response.data }
            } else
                throw error.response.data.error;
        }
        else { throw error.message }
    }
}

export default MessagingService;