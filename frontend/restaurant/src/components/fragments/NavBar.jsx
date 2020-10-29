import React, { useState } from 'react';
//import { ArrowBack, Menu } from '@material-ui/icons';
import { Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import '../../css/navbar.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../context/stateProvider';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
    buttonColor: {
        color: theme.palette.secondary.main
    },
    root: {
        display: 'flex',
        flex: 1,
        justifyContent: "center"
    },
    shopingCart: {
        flex: 0.1,
        marginLeft: "auto",
        textDecoration: "none",
        height: "22px"
    },
    banner: {
        flex: 0.6
    },
    button: {
        flex: 0.3,
    }


}))
const NavBar = (props) => {
    const classes = useStyles();

    const [initialState] = useStateValue();

    //console.log(initialState)
    //console.log(window.location.href.toLowerCase().includes("place"))
    let shoppingCartLink =
        <Link to={"/" + initialState.restaurant.name + "/" + initialState.tableNumber + "/order/place"}
            className={classes.buttonColor}>
            <Badge badgeContent={initialState.order.length} color="secondary">
                <ShoppingCartIcon fontSize="large" className={classes.root} />
            </Badge>
        </Link>
    let menuLink =
        <Link to={"/" + initialState.restaurant.name + "/" + initialState.tableNumber}
            className={classes.buttonColor}>
            Menu
        </Link>

    let link = !window.location.href.toLowerCase().includes("place") ?
        shoppingCartLink : menuLink;

    return (
        <>
            <AppBar className={classes.root} position="sticky" className="navBar">
                <Toolbar color="primary">
                    <div className={classes.banner}>
                        <Typography variant="h6">
                            Welcome to {initialState.restaurant.name}!
                        </Typography>
                    </div>
                    {/* <div>
                        <Button color="secondary">Something wrong with the food?</Button>
                    </div> */}
                    <Typography className={classes.shopingCart}>
                        {link}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}
export default NavBar;