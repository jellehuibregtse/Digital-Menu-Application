import React from 'react';
import List from "../List";
import {Restaurant} from "@material-ui/icons";
import {Container} from "@material-ui/core";


export default () => {



    return (
        <Container>
            <List type="restaurant" icon={<Restaurant/>} items={[{primary: 'Restaurant1', secondary: 'secondary'}, {primary: 'Restaurant2', secondary: 'secondary'}]}/>
        </Container>
    )
}