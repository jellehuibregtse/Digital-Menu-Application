import Stomp from 'stompjs';

// Gateway: 8762

class MessagingService {

    // This is where you can get/post/put/delete messages
    static async fetchHandler(method, route, message) {
        console.log(message);
        let result = null;
        await fetch('http://localhost:8762/api' + route, {
            method: method,
            body: JSON.stringify(message)
        })
            .then((response) => {
                if (response.ok) {
                    return response.text()
                } else {
                    throw new Error(response.statusText)
                }
            })
            .then((res) => {
                try {
                    result = typeof JSON.parse(res) === "object" && JSON.parse(res) !== null ? JSON.parse(res) : res
                    console.log(result);
                } catch (e) {
                    result = res
                }
            })
            .catch(error => {
                throw new Error(error.message)
            });
        return result
    }

    static register(route, onMessage, onClose, onConnect) {
        let socket = new WebSocket('ws://localhost:8762/api/order-service/websockets');
        let stompClient = Stomp.over(socket);
        stompClient.debug = null;
        socket.onclose = onClose();
        stompClient.connect({}, function () {
            stompClient.subscribe(route, onMessage);
            onConnect();
        }, () => {
        });
    }
}

export default MessagingService;