import React from 'react';
import { Toolbar, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import '../css/navbar.css';
import { ShoppingBasket, Home } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../context/stateProvider';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
    buttonColor: {
        color: theme.palette.secondary.main
    },
    root: {
        display: 'flex',
        flex: 1,
        justifyContent: "center",
    },
    icon: {
        flex: 0.1,
        marginLeft: "auto",
        textDecoration: "none",
        color: theme.palette.secondary.main
    },
    banner: {
        flex: 0.6
    },
    button: {
        flex: 0.3,
    }


}))
const NavBar = () => {
    const classes = useStyles();

    const [initialState] = useStateValue();

    //Shows order cart in the navigation when you are in the menu page
    let shoppingCartLink =
        <Link to={"/basket"} className={classes.icon}>
            <Badge badgeContent={initialState.order.length} color="secondary">
                <ShoppingBasket fontSize="large" className={classes.root} />
            </Badge>
        </Link>
    
    //Shows menu link in the navigation when you are in order page
    let menuLink =
        <Link to={"/"} className={classes.icon}>
            <Home href={"/"} fontSize="large" className={classes.root} />
        </Link>

    let link = !window.location.href.toLowerCase().includes("basket") ?
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
                    {link}
                </Toolbar>
            </AppBar>
        </>
    )
}
export default NavBar;