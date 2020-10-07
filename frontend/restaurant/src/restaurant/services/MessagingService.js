// Service Registry Port: 8080

class MessagingService {
    // This is where you can get/post/put/delete messages
    static async fetchHandler(method, route, message) {
        let result = null;
        await fetch('http://localhost:8080/api' + route, {
            method: method,
            body: JSON.stringify(message)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((res) => {result = res})
            .catch(error => {throw new Error(error.message)});
        return result
    }
}

export default MessagingService;