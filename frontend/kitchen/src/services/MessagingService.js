import Stomp from 'stompjs';

// Gateway: 8762

class MessagingService {

    // This is where you can get/post/put/delete messages
    static async auth(message) {
        console.log(message);
        let result = null;
        await fetch("/api/auth-service/auth", {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            }

        })
        .then((response) => {
            if(response.headers.get("Authorization") != null) {
                result = response.headers.get("Authorization");
            }
        })
        .catch(error => {
            throw new Error(error.message)
        });
        return result
    }

    // This is where you can get/post/put/delete messages
    static async fetchHandler(method, route, message) {
        let result = null;
        await fetch(process.env.REACT_APP_GATEWAY_URL + "/api" + route, {
            method: method,
            body: JSON.stringify(message),
            headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Authorization": sessionStorage.getItem("Bearer")
            }

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