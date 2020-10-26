// Service Registry Port: 8080

class MessagingService {
    // This is where you can get/post/put/delete messages
    static async fetchHandler(method, route, message) {
        let result = null;
        await fetch('http://localhost:8080/api' + route, {
            method: method,
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {if (response.ok) { return response.text() } else { throw new Error(response.statusText) }})
            .then((res) => {try {result = typeof JSON.parse(res) === "object" && JSON.parse(res) !== null? JSON.parse(res) : res} catch (e) {result = res}})
            .catch(error => {throw new Error(error.message)});
        return result
    }
}

export default MessagingService;