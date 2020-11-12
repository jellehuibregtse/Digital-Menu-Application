import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import SideBar from "./SideBar";
import Preview from "./Preview";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        overflow: 'auto',
        height: '100%'
    },
    content: {
        width: '100%',
        background: theme.palette.primary.light,
        padding: theme.spacing(3)
    }
}))

const Design = () => {
    const classes = useStyles();

    return (
        <main className={classes.main}>
            <SideBar/>
            <section className={classes.content}>
                <Preview/>
            </section>
        </main>
    )
}

export default Design;