import Stomp from 'stompjs';

// Gateway: 8762

class MessagingService {

    // This is where you can get/post/put/delete messages
    static async fetchHandler(method, route, message) {
        console.log(message);
        let result = null;
        await fetch('http://localhost:8762/api' + route, {
            method: method,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNjA0NjY2MDI1LCJleHAiOjE2MDU0ODEyMDB9.eUamlgUGorU88BpBf6oGUtMof924QS-0geSBHzYlhF7jn7zaECzC1VC4EtOFhIdjGLIy8hnlzwW-6iQxbnaiaA',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {if (response.ok) { return response.text() } else { throw new Error(response.statusText) }})
            .then((res) => {try {result = typeof JSON.parse(res) === "object" && JSON.parse(res) !== null? JSON.parse(res) : res} catch (e) {result = res}})
            .catch(error => {throw new Error(error.message)});
        return result
    }

    static register(route, onMessage, onClose, onConnect) {
        let socket = new WebSocket('ws://localhost:8762/api/order-service/websockets');
        let stompClient = Stomp.over(socket);
        stompClient.debug = null;
        socket.onclose = onClose();
        stompClient.connect({}, function() {
            stompClient.subscribe(route, onMessage);
            onConnect();
        }, () => {});
    }
}

export default MessagingService;