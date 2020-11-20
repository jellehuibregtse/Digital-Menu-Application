import React from 'react';
import {
    Divider,
    List,
    Button, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton
} from "@material-ui/core";
import {AddCircle, Create, Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Popup from "reactjs-popup";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
    head: {
        display: 'flex',
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

    return (
        <>
            <ListItem className={classes.head} button
                      onClick={() => document.location.href = "/restaurant/" + props.name.toLowerCase()}>
                <ListItemAvatar>
                    <Avatar>
                        {props.icon}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.name} secondary={props.info}/>
                <Popup trigger={
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => console.log('2')}>
                            <Create/>
                        </IconButton>
                    </ListItemSecondaryAction>}>
                    test
                </Popup>
            </ListItem>
            <Divider/>
        </>
    )
}

export default (props) => {
    const classes = useStyles();

    return (
        <List>
            <div className={classes.head}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <Search/>
                    </div>
                    <TextField
                        className={classes.searchBar}
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder={"Find a " + props.type + "…"}
                        inputProps={{'aria-label': 'search'}}
                    />
                </div>

                <Button variant="contained" color="secondary" onClick={() => document.location.href = "/new"}>
                    <AddCircle className={classes.buttonIcon}/>
                    New
                </Button>
            </div>
            <Divider/>
            {
                props.items.map(item =>
                    <Item name={item.primary} icon={props.icon} info={item.secondary}/>
                )
            }
        </List>
    )
}