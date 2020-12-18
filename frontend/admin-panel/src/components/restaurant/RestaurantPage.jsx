import React from 'react';
import {Container, Divider, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import ListPage from "../List";
import {ArrowBack, MenuBook} from "@material-ui/icons";
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import SettingsPage from './Settings';
import Design from "./design/Design";
import QRPage from "./qr/QRPage";

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: 'none'
    },
    toolBar: {
        padding: 0,
        justifyContent: 'space-between'
    },
    subFlex: {
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        marginTop: theme.spacing(3)
    },
    backButton: {
        minWidth: 0,
        position: 'absolute',
        marginLeft: theme.spacing(-6)
    },
    header: {
        marginRight: theme.spacing(1)
    }
}))

export default (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <Container>
                <Toolbar className={classes.toolBar}>
                    <IconButton className={classes.backButton} onClick={() => history.push("/")}>
                        <ArrowBack/>
                    </IconButton>
                    <Typography className={classes.header} variant="h5">{props.displayName}</Typography>
                    <Link to={"/" + props.name + "/menu"}>
                        Menu
                    </Link>
                    <Link to={"/" + props.name + "/design"}>
                        Design
                    </Link>
                    <Link to={"/" + props.name + "/qr"}>
                        QR Code
                    </Link>
                    <Link to={"/" + props.name + "/settings"}>
                        Settings
                    </Link>
                </Toolbar>
            </Container>
            <Divider/>
            <Switch>
                <Route exact strict path={"/" + props.name + "/menu"} render={() =>
                    <Container className={classes.content}>
                        <Typography variant="h5">Menus</Typography>
                        <ListPage type="menu" icon={<MenuBook/>} items={[{primary: 'Menu1', secondary: '20 dishes'}]}/>
                    </Container>}/>
                <Route exact strict path={"/" + props.name + "/design"} render={() => <Design/>}/>
                <Route exact strict path={"/" + props.name + "/qr"}
                       render={() => <QRPage id={props.id} name={props.name}/>}/>
                <Route exact strict path={"/" + props.name + "/settings"} render={() => <SettingsPage id={props.id}/>}/>
                <Route path="*" render={() => <Redirect to={"/" + props.name + "/menu"}/>}/>
            </Switch>
        </>
    )
}