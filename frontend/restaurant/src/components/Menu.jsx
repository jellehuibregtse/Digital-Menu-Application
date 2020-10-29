import React from 'react';
import '../css/menu.css';
import '../css/orderBar.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
    // Get order from global state
    const [state] = useStateValue();

    const classes = useStyles();
    //const [order, setOrder] = useState(JSON.parse(sessionStorage.getItem('order')) != null ? JSON.parse(sessionStorage.getItem('order')) : []);

    // Get all menuItems from menu
    const itemsList = typeof state.menu !== 'undefined' ? state.menu.items.map(item => {
        return (
            <>
                <Grid item xs={6} sm={3}>
                    <Product
                        name={item.name}
                        price={item.price}
                        key={item.id}
                        id={item.id}
                    />
                </Grid>
                {/* <Button onClick={() => {
                    let o = JSON.parse(sessionStorage.getItem('order')) != null ? JSON.parse(sessionStorage.getItem('order')) : [];
                    o.push(item.id);
                    sessionStorage.setItem('order', JSON.stringify(o));
                    setOrder(o);
                }}
                key={index+1000}
                variant="outlined">Add to order
                </Button> */}
            </>
        )
    }) : null;

    return (
        <>
            {/* <div id="menu">
                <h1>{typeof state.menu !== 'undefined' ?  state.menu.name : null}</h1>
                <div className="item-flex">{items}</div>
            </div> */}
            <div className={classes.root}>
                
                <Grid container spacing={3}>
                    {itemsList}
                </Grid>
            </div>

        </>
    )
}

export default Menu;