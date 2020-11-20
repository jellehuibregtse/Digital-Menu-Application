import MessagingService from "../../services/MessagingService";

export default class {

    static isValidName(name) {
        if (name !== null) {
            if (name.length === 0)
                return 'Name is required!';
            if (name.length < 4)
                return 'Name length must be a minimum of 4!';
            if (name.length > 40)
                return 'Name length must be a maximum of 40!';
            if(!/^[A-Za-z]+.*$/.test(name))
                return 'Name must start with a letter';
            if (!/^[A-Za-z]+([-_' ]+[A-Za-z]+)*$/.test(name))
                return 'Name shouldn\'t end with a any of these characters: "-_\' "!';
        }

        return true;
    }

    static async nameAvailable(name) {
        if (name !== null) {
            let response = '';
            await MessagingService.fetchHandler('GET', '/restaurant-service/restaurants?name=' + name).then(r => response = r).catch();
            if(response === 'true')
                return false;
        }

        return true;
    }
}