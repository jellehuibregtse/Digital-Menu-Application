import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {InputBase, List, ListItem, Divider, Typography, Container} from "@material-ui/core";
import {Search} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    listItem: {
        display: 'flex',
        justifyContent: "space-between"
    },
    subFlex: {
        display: 'flex',
        alignItems: 'center'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
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
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))

const Menus = () => {
    const classes = useStyles();

    return (
        <Container>
            <List>
                <ListItem className={classes.listItem + classes.subFlex}>
                    <Typography variant="h6">Menus</Typography>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                </ListItem>
                <Divider/>
            </List>
        </Container>
    )
}

export default Menus;