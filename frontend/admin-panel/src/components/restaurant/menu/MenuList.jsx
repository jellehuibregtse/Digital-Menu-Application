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
import EditMenuDialog from './EditMenuDialog';
const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: theme.spacing(2)
    },
    head: {
        display: 'flex',
        flex: 1,
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
    },
    btn: {
        height: "50%",
        marginTop: "2%"
    }
}))

const getMenusByRestaurantId = (id) => {
    return MessagingService.fetchHandler("GET", `/api/menu-service/menus/byRestaurantId/${id}`)
}

const Item = (props) => {
    const classes = useStyles();
    //const history = useHistory();

    const editClickHandler =(e)=>{
        props.openDialog(props.menu.id)
    }
    return (
        <div style={{ display: "flex", flex: 1 }}>
            <ListItem key={props.index} onClick={(e) => window.location.href = `./menu/${props.menu.id}`} className={classes.head} button>
                <ListItemAvatar>
                    <Avatar>
                        <MenuBookIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.menu.name} secondary={"Items: " + props.menu.items.length} />

            </ListItem>
            <Button key={props.index + 1 * 17}
                color="primary" className={classes.btn} variant="contained"
                onClick={editClickHandler}>
                Edit Menu</Button>
        </div>
    )
}

export default (props) => {
    const classes = useStyles();

    const [menus, setMenus] = useState([]);
    const [input, setInput] = useState("")
    const [isOpen,setIsOpen] = useState(false)
    const [editedMenuId,setEditedMenuId] = useState(-1);

    const openDialog = (menuId) => {
        setIsOpen(true)
        setEditedMenuId(menuId)
    }
    const closeDialog = () => {
        setIsOpen(false)
        setEditedMenuId(-1)
    }
    useEffect(() => {
        getMenusByRestaurantId(props.restaurantId).then(r => r.length!==0?setMenus(r):setMenus([]))
    }, [])

    console.log(editedMenuId)
    let items = menus.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
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
                            onChange={(e) => setInput(e.target.value)}
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
            <EditMenuDialog closeDialog={closeDialog} isOpen={isOpen} menuId = {editedMenuId}/>
            <List>
                {items.length !== 0 ? items.map((item, index) => <Item  openDialog={openDialog} index={index} menu={item} />) : "This restaurant has no such menu created yet."}
            </List>
        </Container>
    )
}