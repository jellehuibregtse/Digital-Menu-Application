import React from "react";
import Card from "./Card";
import {Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    column: {

    }
}))

const DishColumn = (props) => {
    const classes = useStyles();

    const items = props.items.map((item, index) => {
        return (
            <Card
                id={item.id.toString()}
                key={item.id.toString()}
                index={index}
                name={item.name}
                quantity={item.quantity}
                table={item.tableNumber}
            />
        );
    });

    return (
        <Grid container justify="center" className={classes.column} {...props} ref={props.innerRef}>
            <Typography variant={"h5"}><strong>{props.name}</strong></Typography>
            <div className="items">{items}</div>
        </Grid>
    );
};

export default DishColumn;