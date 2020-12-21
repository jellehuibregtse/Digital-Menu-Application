import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import MessagingService from '../../../services/MessagingService';

const useStyles = makeStyles((theme) => ({
    button: {
        height: "50%",
        marginTop: "14px"
    },
    error: {
        color: "red"
    }
}))
const createNewMenu = (menu) => {
    return MessagingService.fetchHandler("POST", "/api/menu-service/menus", menu)
}

export default (props) => {
    const history = useHistory();

    const classes = useStyles();

    const [menu, setMenu] = useState({ categories: [], items: [], name: "", restaurantId: -1 })

    const [error, setError] = useState("");

    useEffect(() => {
        let m = menu;
        m.restaurantId = props.restaurantId;
        setMenu(m);
    }, [props.id])

    const onClickHandler = (e) => {
        (menu.name === "" || menu.categories.length === 0) ?
            setError("Set menu name and category list")
            : createNewMenu(menu).then(r => {
                history.goBack()
            });
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
                    label="Menu categories"
                    helperText="type your category names separated by comma"
                    autoFocus
                    onChange={(e) => {
                        let categories = e.target.value.split(",")
                        let c = categories.map(item => {
                            return { id: 0, name: item }
                        })
                        let m = menu;
                        m.categories = c;
                        setMenu(m)
                    }}
                />
                <Button onClick={onClickHandler} className={classes.button} type="submit" variant="contained" color="primary">
                    Create menu
                </Button>
            </Grid>
            <Grid container justify="center">
                {error !== "" ? <Typography variant="h6" className={classes.error}>{error}</Typography> : null}
            </Grid>

        </>
    )
}