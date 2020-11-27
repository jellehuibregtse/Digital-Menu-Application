import MessagingService from "../../services/MessagingService";

export default class {

    static isValidName(name) {
        if (name !== null) {
            if (name.length === 0)
                return 'Name is required!';
            if(!/^(.*[a-zA-Z]+.*){4,}$/.test(name))
                return 'Name must have a minimum of 4 letters!';
            if (name.length > 40)
                return 'Name length must be a maximum of 40!';
        }

        return true;
    }

    static async nameAvailable(name) {
        if (name !== null) {
            let response = '';
            await MessagingService.fetchHandler('GET', '/api/restaurant-service/restaurants?name=' + name).then(r => response = r).catch();
            if(response === 'true')
                return false;
        }

        return true;
    }
}