export default class {

    static async handleSignIn(email, password) {
        let result = null;
        await fetch("/api/auth-service/auth", {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
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
        // if (this.isValidEmail(email) === true && this.isValidPassword(password) === true) {
        //
        // }
    }

    // This is where you can get/post/put/delete messages
    static async auth(message) {
        let result = null;
        await fetch("/api/auth-service/auth", {
            method: 'POST',
            body: JSON.stringify(message),
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
        return result
    }
}