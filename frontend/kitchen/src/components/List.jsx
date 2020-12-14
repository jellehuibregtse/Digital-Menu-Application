import React, {useEffect, useState} from 'react';
import {
    Divider,
    List,
    Button, ListItemAvatar, Avatar, ListItemText
} from "@material-ui/core";
import {AddCircle, Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";

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
    const history = useHistory();

    return (
        <>
            <ListItem className={classes.head} button
                      onClick={() => history.push(props.href)}>
                <ListItemAvatar>
                    <Avatar>
                        {props.icon}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.name} secondary={props.info}/>
            </ListItem>
            {props.divider? <Divider/> : null}
        </>
    )
}

export default (props) => {
    const history = useHistory();
    const classes = useStyles();

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.items);
    }, [props.items])

    const filter = (input) => {
        setItems(props.items.filter(item => item.primary.toLowerCase().includes(input.toLowerCase())));
    }

    return (
        <div>
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
                        onChange={e => filter(e.target.value)}
                    />
                </div>
            </div>
            <List>
                {
                    items.length > 0?
                    items.map(item =>
                        <Item divider={items.length > 1} key={item.href} name={item.primary} icon={props.icon} info={item.secondary} href={item.href}/>
                    ) :
                        <ListItem>
                            <ListItemText>It seems like you don't have any restaurants yet go to <a href="https://dma-frontend-admin.radiationservers.com/">admin panel</a> to create one.</ListItemText>
                        </ListItem>
                }
            </List>
        </div>
    )
}