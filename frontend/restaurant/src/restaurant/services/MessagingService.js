import axios from "axios";

// Service Registry Port: 8080

class MessagingService {

    // Post message to address
    static async tryPostMessage(route, message) {
        let result = null;
        await axios.post('http://localhost:8080/api' + route, message).then(res => {
            result = res.data;
        }).catch(error => this.throwError(error));
        return result;
    }

    // Get message from address
    static async tryGetMessage(route) {
        let result = null;
        await axios.get('http://localhost:8080/api' + route).then(res => {
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