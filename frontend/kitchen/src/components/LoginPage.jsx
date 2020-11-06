import React from 'react';
import styled from 'styled-components'
import '../css/loginpage.css'

const Login = styled.div`
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    width : 20vw;

`

 const LoginPage = () =>{

    return(
        
        <Login>
            <h1>LOGIN:</h1>

            <div class="input-group input-group-lg mt-2">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="1">Username</span>
                </div>

                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>

            </div>

            <div class="input-group input-group-lg mt-2">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="2">Password</span>
                </div>

                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>

            </div>

            <button className="btn btn-primary mt-2 btn-lg">Login</button>
        </Login>
    )
}

export default LoginPage;