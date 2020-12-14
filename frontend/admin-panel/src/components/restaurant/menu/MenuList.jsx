import React, { useEffect, useState } from 'react';
import List from "@material-ui/core/List";
import {
    Divider,
    Button, ListItemAvatar, Avatar, ListItemText
} from "@material-ui/core";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { AddCircle, Search } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import { Container, makeStyles, Typography } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";
import MessagingService from '../../../services/MessagingService';
const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: theme.spacing(2)
    },
    head: {
        display: 'flex',
        flex:1,
        justifyContent: "space-between",
        padding: theme.spacing(1, 0)
    },
    subFlex: {
        display: 'flex',
        alignItems: 'center'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(2),
        width: '100%',
        '& > div': {}
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchBar: {
        '& > div': {
            '& > input': {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(5)}px)`
            }
        }
    },
    buttonIcon: {
        marginRight: theme.spacing(1)
    },
    listItem: {
        padding: theme.spacing(1, 2)
    }
}))

const Item = (props) => {
    const classes = useStyles();
    //const history = useHistory();

    return (
        <>
            <ListItem onClick={(e)=>window.location.href=`./menu/${props.menu.id}`} className={classes.head} button>
                <ListItemAvatar>
                    <Avatar>
                        <MenuBookIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.menu.name} secondary={"Items: " + props.menu.items.length} />
            </ListItem>
            {props.divider ? <Divider /> : null}
        </>
    )
}
const getMenusByRestaurantId = (id) => {
    return MessagingService.fetchHandler("GET", `/api/menu-service/menus/byRestaurantId/${id}`)
}
export default (props) => {
    const classes = useStyles();

    const [menus, setMenus] = useState([]);


    useEffect(() => {
        
        getMenusByRestaurantId(props.restaurantId).then(r=>setMenus(r))
        
    }, [])

    console.log(menus)
    return (

        <Container className={classes.content}>
            <div>
                <div className={classes.head}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search />
                        </div>
                        <TextField
                            className={classes.searchBar}
                            size="small"
                            fullWidth
                            variant="outlined"
                            placeholder={"Find a " + props.type + "…"}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

                    <Button variant="contained" color="secondary" onClick={() => {
                        window.location.href = `/${props.restaurantName}/newmenu`
                    }}>
                        <AddCircle className={classes.buttonIcon} />
                    New
                </Button>
                </div>
            </div>
            <Typography variant="h5">Menus</Typography>
            <List>
                {menus.length !== 0 ? menus.map(item => <Item menu={item} />) : "This restaurant has no menu created yet."}
            </List>
        </Container>
    )
}