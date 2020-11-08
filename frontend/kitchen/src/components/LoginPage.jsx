import React from 'react';
import '../css/loginpage.css'
import MessagingService from "../services/MessagingService";

const LoginPage = () => {
    let username;
    let password;

    return (
        <form className="login" onSubmit={() => {
            MessagingService.auth({
                username: username.value,
                password: password.value
            }).then((res) => {
                sessionStorage.setItem("Bearer", res);
                document.location.href = "/";
            })
        }}>
            <h1>LOGIN</h1>

            <label class="input-group input-group-lg mt-2">
                <div class="input-group-prepend">
                    <span class=" input-group-prepend input-group-text" id="1">Username</span>
                </div>

                <input ref={(r) => {
                    username = r
                }} type="text" className="form-control" aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-lg"/>

            </label>

            <label class="input-group input-group-lg mt-2">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="2">Password</span>
                </div>

                <input ref={(r) => {
                    password = r
                }} type="password" class="form-control" aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-lg"/>
            </label>

            <input type="submit" className="btn btn-primary mt-2 btn-lg" value="Login"/>
        </form>
    )
}

export default LoginPage;