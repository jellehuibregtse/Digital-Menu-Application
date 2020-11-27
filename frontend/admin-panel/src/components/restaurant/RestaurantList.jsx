import React, {useEffect, useState} from 'react';
import List from "../List";
import {Restaurant} from "@material-ui/icons";
import {Container} from "@material-ui/core";
import MessagingService from "../../services/MessagingService";


export default (props) => {

    return (
        <Container>
            <List type="restaurant" icon={<Restaurant/>} items={props.restaurants.map(restaurant => {return {primary: restaurant.displayName}})}/>
        </Container>
    )
}