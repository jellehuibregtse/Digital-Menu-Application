import axios from "axios";

const MENU_SERVICE_URL = 'http://localhost:8081/api/menu';

class MenuService {
    static async getMenu() {
        let result;
        try {
            await axios.post(MENU_SERVICE_URL + 'get-all', 0).then(res => {
                result = res;
            }).catch(error => {
                if(typeof error.response.data === 'string') {
                    result = error.response.data.match(/\[(.*?)\]/)[1];
                    if(result == null) { result = error.response.data }
                } else {
                    result = error.response.data.error;
                }
            });
        } catch(e) {
            result = 'Internal Server Error';
        }
        return result;
    }
}

export default MenuService;