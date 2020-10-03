import axios from "axios";

class MessagingService {
    static async tryPostMessage(route, message) {
        let result = null;
        try {
            await axios.post('http://localhost:8081/api' + route, message).then(res => {
                result = res.data;
            }).catch(error => {
                if(typeof error.response.data === 'string') {
                    let result = error.response.data.match(/\[(.*?)]/)[1];
                    if(result != null) { throw result } else { throw error.response.data }
                } else
                    throw error.response.data.error;
            });
        } catch(e) {
            throw new Error("Internal Server Error");
        }
        return result;
    }

    static async tryGetMessage(route) {
        let result = null;
        try {
            await axios.get('http://localhost:8081/api' + route).then(res => {
                result = res.data;
            }).catch(error => {
                if(typeof error.response.data === 'string') {
                    let result = error.response.data.match(/\[(.*?)]/)[1];
                    if(result != null) { throw result } else { throw error.response.data }
                } else
                    throw error.response.data.error;
            });
        } catch(e) {
            throw new Error("Internal Server Error");
        }
        return result;
    }
}

export default MessagingService;