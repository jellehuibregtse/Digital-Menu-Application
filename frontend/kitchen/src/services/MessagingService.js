import Stomp from 'stompjs';

// Gateway: 8762

class MessagingService {

    // This is where you can get/post/put/delete messages
    static async fetchHandler(method, route, message) {
        let result = null;
        await fetch(process.env.REACT_APP_GATEWAY_URL + route, {
            method: method,
            body: JSON.stringify(message),
            headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Authorization": localStorage.getItem('token')
            }

        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(response.status + " " + response.statusText);
                }
            })
            .then((res) => {
                try {
                    result = typeof JSON.parse(res) === "object" && JSON.parse(res) !== null ? JSON.parse(res) : res;
                } catch (e) {
                    result = res;
                }
            })
            .catch(error => {
                throw new Error(error.message);
            });
        return result
    }

    static register(route, onMessage, onClose, onConnect) {
        let socket = new WebSocket(process.env.REACT_APP_WEBSOCKETS_URL);
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