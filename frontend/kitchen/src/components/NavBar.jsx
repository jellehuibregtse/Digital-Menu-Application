import React from 'react';
import {
    Button,
    Toolbar,
    Typography,
    List,
    AppBar,
    IconButton,
    ListItem,
    Divider,
    Box,
    makeStyles
} from "@material-ui/core";
import {Link} from 'react-router-dom';
import {AccountCircle} from "@material-ui/icons";
import Popup from "reactjs-popup";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: 900
    },
    toolBar: {
        display: 'flex',
        justifyContent: "space-between"
    },
    subFlex: {
        display: 'flex',
        alignItems: 'center'
    },
    link: {
        color: theme.palette.primary.contrastText,
        marginRight: '20px',
        '&:hover': {
            opacity: 0.75
        }
    },
    iconLink: {
        color: theme.palette.secondary.main,
        width: '50px',
        textAlign: 'center',
        '&:hover': {
            opacity: 0.75
        }
    },
    iconButton: {
        color: theme.palette.secondary.contrastText,
    },
    popup: {
        background: '#fff',
        borderRadius: '5px',
        border: grey['300'] + ' solid 1px'
    },
    divider: {
        margin: '0 16px'
    },
    popupLink: {
        color: '#000'
    },
    mail: {
        color: grey['500'],
        fontSize: '14px'
    }
}))

const logout = () => {
    localStorage.removeItem('token');
    document.location.href = "/";
}

const NavBar = (props) => {
    const classes = useStyles();

    const popup =
        <Box className={classes.popup}>
            <List>
                <ListItem>
                    <Typography className={classes.mail}>
                        Signed in as <strong>{props.email}</strong>
                    </Typography>
                </ListItem>
                <Divider className={classes.divider}/>
                <Link to="/restaurants" className={classes.popupLink}>
                    <ListItem button>
                        Your Restaurants
                    </ListItem>
                </Link>
                <Divider className={classes.divider}/>
                <Link to="/settings" className={classes.popupLink}>
                    <ListItem button>
                        Settings
                    </ListItem>
                </Link>
                <ListItem button onClick={logout}>
                    Sign Out
                </ListItem>
            </List>
        </Box>;

    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <div className={classes.subFlex}>
                    <Link className={classes.link} to="/">
                        <Typography variant="h6">Digital Menu Application - Kitchen</Typography>
                    </Link>
                </div>

                {props.loggedIn ?
                    <div className={classes.subFlex}>
                        <Popup trigger={
                            <IconButton className={classes.iconButton}>
                                <AccountCircle/>
                            </IconButton>}
                               position="bottom right" offsetY={-10} offsetX={17} repositionOnResize={true}>
                            {popup}
                        </Popup>
                    </div>
                    :
                    <div className={classes.subFlex}>
                        <a className={classes.link} href={"/sign-up"}>Sign Up</a>
                        <Button href={"/sign-in"} size="small" variant="contained" color="secondary">Sign In</Button>
                    </div>}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;