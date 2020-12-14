import React from "react";
import OrderCard from "./OrderCard";
import {Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    column: {
        minHeight: theme.spacing(10 )
    }
}))

export default (props) => {
    const classes = useStyles();

    const items = props.items.map((item, index) => {
        return (
            <OrderCard
                id={item.id.toString()}
                key={item.id.toString()}
                index={index}
                items={item.items}
                createdDateTime={item.createdDateTime}
                table={item.tableNumber}
            />
        );
    });

    return (
        <Grid container justify="center" className={classes.column} {...props} ref={props.innerRef}>
            <Typography variant={"h5"}><strong>{props.name}</strong></Typography>
            <div className="items">{items}</div>
        </Grid>
    )
}