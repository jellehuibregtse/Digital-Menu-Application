import Stomp from 'stompjs';

// Gateway: 8762

class MessagingService {

    // This is where you can get/post/put/delete messages
    static async fetchHandler(method, route, message) {
        console.log(message);
        let result = null;
        await fetch("/api" + route, {
            method: method,
            body: JSON.stringify(message),
            headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            }

        })
            .then((response) => {
                console.log(response);
                console.log(response.headers.get("Authorization"))
                if (response.ok) {
                    return response.text()
                } else {
                    throw new Error(response.statusText)
                }
            })
            .then((res) => {
                try {
                    result = typeof JSON.parse(res) === "object" && JSON.parse(res) !== null ? JSON.parse(res) : res
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