import axios from "axios";

class MessagingService {
    static async tryPostMessage(port, route, message) {
        let result = null;
        await axios.post('http://localhost:' + port + '/api' + route, message).then(res => {
            result = res.data;
        }).catch(error => this.throwError(error));
        return result;
    }

    static async tryGetMessage(port, route) {
        let result = null;
        await axios.get('http://localhost:' + port + '/api' + route).then(res => {
            result = res.data;
        }).catch(error => this.throwError(error));
        return result;
    }

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