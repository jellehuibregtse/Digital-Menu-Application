// Service Registry Port: 8762

class MessagingService {
    // This is where you can get/post/put/delete messages
    static async fetchHandler(method, route, message) {
        let result = null;
        await fetch(process.env.REACT_APP_GATEWAY_URL + route, {
            method: method,
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json',
                "accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
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
            .catch((error) => {
                throw new Error(error.message)
            });
        return result
    }
}

export default MessagingService;