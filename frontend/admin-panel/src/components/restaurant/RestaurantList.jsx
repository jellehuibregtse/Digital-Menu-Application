import React from 'react';
import List from "../List";
import {Restaurant} from "@material-ui/icons";
import {Container, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: theme.spacing(2)
    }
}))

export default (props) => {
    const classes = useStyles();

    return (
        <Container className={classes.content}>
            <Typography variant="h5">Restaurants</Typography>
            <List type="restaurant" icon={<Restaurant/>} items={props.restaurants.map(restaurant => {return {primary: restaurant.displayName, href: restaurant.name}})}/>
        </Container>
    )
}