import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        height: "50%",
        marginTop: "14px"
    },
    error: {
        color: "red"
    }
}))
export default (props) => {
    // const history = useHistory();
    const classes = useStyles();
    const [menu, setMenu] = useState({ categories: [], items: [], name: "" })
    const [error, setError] = useState("");
    const onClickHandler = (e) => {
        if (menu.name === "" || menu.categories.length === 0) {
            setError("Set menu name and category list")
        } else {
            console.log(menu)
        }
    }
    return (
        <>
            <Grid container justify="space-around">
                <TextField
                    id="name"
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    label="Menu name"
                    autoFocus
                    onChange={(e) => {
                        let name = e.target.value;
                        let m = menu;
                        m.name = name
                        setMenu(m);
                    }}
                />
                <TextField
                    id="cat"
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    label="category1,category2"
                    helperText="type your category names separated by comma"
                    autoFocus
                    onChange={(e) => {
                        let categories = e.target.value.split(",")
                        let m = menu;
                        m.categories = categories;
                        setMenu(m)
                    }}
                />
                <Button onClick={onClickHandler} className={classes.button} type="submit" variant="outlined" color="primary">
                    Create menu
                </Button>
            </Grid>
            <Grid container justify="center">
                {error !== "" ? <Typography variant="h6" className={classes.error}>{error}</Typography> : null}
            </Grid>

        </>
    )
}