import React from 'react';
import '../css/menu.css';
import '../css/orderBar.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Product from './fragments/Product';
import { useStateValue } from '../context/stateProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "2%"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const Menu = (props) => {
    console.log(props.menu)

    const classes = useStyles();

    // Get all menuItems from menu
    const itemsList = typeof props.menu !== 'undefined' ? props.menu.items.map(item => {
        console.log(item)
        return (
            <>
                <Grid key={item.id+1000} item xs={6} sm={3}>
                    <Product
                        name={item.name}
                        price={item.price}
                        key={item.id}
                        id={item.id}
                    />
                </Grid>
            </>
        )
    }) : null;

    return (
        <>
            <div className={classes.root}>
                <Grid key={1} container spacing={3}>
                    {itemsList}
                </Grid>
            </div>

        </>
    )
}

export default Menu;