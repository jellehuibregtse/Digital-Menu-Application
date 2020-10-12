import React from 'react';
import {Button} from "@material-ui/core";
import messagingService from './services/MessagingService';

const message = {
    username: "Aron",
    password: "admin"
}

function App() {
  return (
      <>
          <Button onClick={() => messagingService.fetchHandler('POST', '/users/register', message).then((res) => console.log(res)).catch(() => {})}>REGISTER</Button>
          <Button onClick={() => messagingService.fetchHandler('POST', '/users/login', message).then((res) => console.log(res)).catch(() => {})}>LOGIN</Button>
      </>
  );
}

export default App;
