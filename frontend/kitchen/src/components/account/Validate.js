import MessagingService from "../../services/MessagingService";

export default class {

    static isValidEmail(email) {
        if (email !== null) {
            if (email.length === 0)
                return 'Email address is required!';
            if (!/^(([^<>()\[\]\\,;:\s"]+([^<>()\[\]\\,;:\s"]+)*)|(".+"))$/.test(email))
                return 'Email contains illegal characters!';
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")).*$/.test(email))
                return 'Email is invalid! Try adding a valid local part.';
            if (!/^.*((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
                return 'Email is invalid! Try adding a valid domain.';
            if (!/([@])/.test(email))
                return 'Email is invalid! Try adding \'@\' before the domain.';
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
                return 'Email is invalid!';
        }

        return true;
    }

    static async emailAvailable(email) {
        if (email !== null) {
            let response = '';
            await MessagingService.fetchHandler('GET', '/api/auth-service/users?email=' + email).then(r => response = r).catch();
            if(response === 'true')
                return false;
        }

        return true;
    }

    static isValidPassword(password) {
        if (password !== null) {
            if (password.length === 0)
                return 'Password is required!';
            if (password.length < 8)
                return 'Password length must be a minimum of 8!';
            if (password.length > 40)
                return 'Password length must be a maximum of 40!';
            if (!/^.*$/.test(password))
                return 'Password contains illegal characters!';
            if (!/([a-z])/.test(password))
                return 'Password must contain at least one letter in lower case!';
            if (!/([A-Z])/.test(password))
                return 'Password must contain at least one letter in upper case!';
            if (!/([0-9])/.test(password))
                return 'Password must contain at least one digit!';
        }
        return true;
    }
}