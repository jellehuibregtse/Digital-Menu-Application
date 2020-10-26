import React from 'react';
import {ArrowBack, Menu} from '@material-ui/icons';
import {Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import '../../css/navbar.css';

export default (props) => {
    const { icons, session } = props;
    return (
        <>
            <AppBar position="fixed" className="navBar">
                <Toolbar color="primary">
                    {typeof icons != 'undefined'? <>
                            {icons.includes("ArrowBack")? <IconButton edge="start" aria-label="back" href={"/" + props.session.restaurant.name + "/" + props.session.tableNumber}><ArrowBack/></IconButton> : null}
                            {icons.includes("Menu")? <IconButton edge="start" aria-label="menu"><Menu/></IconButton> : null}
                        </>
                        : null
                    }
                    <Typography variant="h6">
                        Welcome to {session.restaurant.name}!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}