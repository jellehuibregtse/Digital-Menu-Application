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
import BallotIcon from '@material-ui/icons/Ballot';
import { useHistory } from "react-router-dom";
import MessagingService from '../../../services/MessagingService';
import { useParams } from 'react-router-dom';
import MenuItemDialog from './MenuItemDialog'

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: theme.spacing(2)
    },
    head: {
        display: 'flex',
        flex: 1,
        justifyContent: "space-between",
        padding: theme.spacing(1, 0),
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
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        alignContent:"center"

    },
    textField:{
        width:"15%"
    },
    button:{
        height:"50%",
        margin:"8px 8px"
    }
}))

const Item = (props) => {
    const classes = useStyles();
    //const history = useHistory();
    return (
        <>
            <ListItem className={classes.head} >
                <ListItemAvatar>
                    <Avatar>
                        <BallotIcon />
                    </Avatar>
                </ListItemAvatar>
                <div className={classes.listItem}>
                    <ListItemText className={classes.textField} primary={props.item.name} secondary={"Price: €" + props.item.price} />
                    <ListItemText className={classes.textField} primary={"Category: " + props.item.category.name} secondary={"Ingredients: " + props.item.ingredients.map(item => item.name).join(",")} />
                    <Button
                    onClick={(e)=>props.openDialog(props.item.id,"EDIT")}
                    className={classes.button} variant="contained" color="primary">Edit</Button>
                    <Button 
                    onClick={(e)=>props.openDialog(props.item.id,"DELETE")}
                    className={classes.button} variant="contained" color="secondary">Delete</Button>
                </div>
            </ListItem>
            <Divider />
        </>
    )
}
const getMenuById = (id) => {
    return MessagingService.fetchHandler("GET", `/api/menu-service/menus/${id}`)
}
const DetailsList = (props) => {
    let { id } = useParams();
    const classes = useStyles();

    const [menu, setMenu] = useState(null)
    const [input,setInput]= useState("")
    const [isOpen,setIsOpen] = useState(false)
    const [itemId,setItemId] = useState(-1);
    const [type,setType] = useState("");

    const openDialog = (id,type) => {
        setIsOpen(true)
        setItemId(id)
        setType(type)
    }

    const closeDialog = () => {
        setIsOpen(false)
        setItemId(-1)
    }

    useEffect(() => { getMenuById(id).then(r => setMenu(r)) }, [props])
    console.log(menu)

    const onInputChangeHandler = (e)=>{
        setInput(e.target.value);
    }
    
    if (menu === null) {
        return (<h2>Loading</h2>)
    } else {
        let items = menu.items.filter((item)=>item.name.toLowerCase().includes(input.toLowerCase()))
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
                                onChange={onInputChangeHandler}
                            />
                        </div>

                        <Button variant="contained" color="secondary" onClick={() => {
                            window.location.href = `/${props.restaurantName}/newitem/${id}`
                        }}>
                            <AddCircle className={classes.buttonIcon} />
                    New
                </Button>
                    </div>
                </div>
                <Typography variant="h5">{menu.name}</Typography>
                <MenuItemDialog 
                closeDialog={closeDialog} 
                isOpen={isOpen} 
                type={type}
                itemId={itemId}
                categories={menu.categories}/>
                <List>
                    {items !== null ? items.map(item => <Item openDialog={openDialog} item={item} />) : "This restaurant has no menu created yet."}
                </List>
            </Container>);
    }
}

export default DetailsList;