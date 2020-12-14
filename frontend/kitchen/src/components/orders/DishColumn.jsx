import React from "react";
import Card from "./Card";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    column: {
        background: 'white',
        margin: theme.spacing(3, 2),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        border: '1px solid ' + grey['300'],
        overflow: 'auto',
        flexWrap: 'inherit'
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
        <Grid container direction="column" alignItems="center" className={classes.column} {...props} ref={props.innerRef}>
            <Typography variant={"h5"}><strong>{props.name}</strong></Typography>
            <div className="items">{items}</div>
        </Grid>
    );
};

export default DishColumn;