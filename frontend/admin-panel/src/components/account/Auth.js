import MessagingService from "../../services/MessagingService";

export default class {

    static async handleSignIn(email, password) {
        let result = null;
        await fetch("/api/auth-service/auth", {
            method: 'POST',
            body: JSON.stringify({username: email, password: password}),
            headers: {
                "Content-Type": "application/json",
                "accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            }
        })
            .then((response) => {
                if (response.headers.get("Authorization") != null) {
                    result = response.headers.get("Authorization");
                }
            })
            .catch(error => {
                throw new Error(error.message)
            });
        return result;
    }

    static async handleSignUp(email, password) {
        let result = null;
        await MessagingService.fetchHandler('POST', '/auth-service/users', {email: email, password: password}).then(() => result = true).catch(r => result = r);
        return result;
    }
}