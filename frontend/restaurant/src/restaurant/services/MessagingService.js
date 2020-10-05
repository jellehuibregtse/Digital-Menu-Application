import axios from "axios";

// Hardcoded ports
// TODO: change all ports to service registry port
const SERVICE_REGISTRY_PORT = null;
const RESTAURANT_PORT = 8081;
const MENU_PORT = 8082;
const ORDER_PORT = 8083;

class MessagingService {

    // Post message to address
    static async tryPostMessage(port, route, message) {
        let result = null;
        await axios.post('http://localhost:' + port + '/api' + route, message).then(res => {
            result = res.data;
        }).catch(error => this.throwError(error));
        return result;
    }

    // Get message from address
    static async tryGetMessage(port, route) {
        let result = null;
        await axios.get('http://localhost:' + port + '/api' + route).then(res => {
            result = res.data;
        }).catch(error => this.throwError(error));
        return result;
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