import axios from "axios";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// Service Registry Port: 8080

class MessagingService {

    // Get message from address
    static async tryGetMessage(route) {
        let result = null;
        await axios.get('http://localhost:8080/api' + route).then(res => {
            result = res.data;
        }).catch(error => this.throwError(error));
        return result;
    }

    // Register to address
    static register(route, onMessage, onClose, onConnect) {
        let socket = new SockJS('http://localhost:8080/api/websockets');
        let stompClient = Stomp.over(socket);
        stompClient.debug = null;
        socket.onclose = onClose();
        stompClient.connect({}, function() {
            stompClient.subscribe(route, onMessage);
            onConnect();
        });
    }

    // Throw correct error message from error
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