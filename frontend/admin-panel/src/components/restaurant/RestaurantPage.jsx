import React from 'react';
import {
    List,
    Box,
    Button,
    Container,
    makeStyles,
    TextField,
    Typography,
    Toolbar,
    Divider,
    ListItem
} from "@material-ui/core";
import ListPage from "../List";
import {ArrowBack, MenuBook, People, Settings} from "@material-ui/icons";
import Popup from "reactjs-popup";
import {useHistory} from "react-router-dom";
import MessagingService from "../../services/MessagingService";

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: 'none'
    },
    toolBar: {
        padding: 0,
        justifyContent: 'space-between'
    },
    subFlex: {
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        marginTop: theme.spacing(2)
    },
    backButton: {
        minWidth: 0,
        position: 'absolute',
        marginLeft: theme.spacing(-6)
    },
    header: {
        marginRight: theme.spacing(1)
    }
}))

const deleteRestaurant = (id) => {
    MessagingService.fetchHandler('DELETE', '/api/restaurant-service/restaurants/' + id)
        .then(() => document.location.href = "/");
}

export default (props) => {
    const classes = useStyles();
    const history = useHistory();

    const settings =
        <Box className={classes.popup}>
            <List>
                <ListItem button onClick={() => deleteRestaurant(props.id)}>
                    Delete
                </ListItem>
            </List>
        </Box>;

    return (
        <>
            <Container>
                <Toolbar className={classes.toolBar}>
                    <Button className={classes.backButton} onClick={() => history.push("/")}>
                        <ArrowBack/>
                    </Button>
                    <div className={classes.subFlex}>
                        <Typography className={classes.header} variant="h5">{props.restaurantName}</Typography>
                        <Popup trigger={
                            <Button className={classes.button}>
                                <People/>
                                Invite
                            </Button>}>
                            <Box>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email"
                                />
                                <Button>

                                </Button>
                                <List>

                                </List>
                            </Box>
                        </Popup>
                    </div>
                    <Popup trigger={
                        <Button className={classes.button}>
                            <Settings/>
                            Settings
                        </Button>}>
                        {settings}
                    </Popup>
                </Toolbar>
            </Container>
            <Divider/>
            <Container className={classes.content}>
                <Typography variant="h5">Menus</Typography>
                <ListPage type="menu" icon={<MenuBook/>} items={[{primary: 'Menu1', secondary: '20 dishes'}]}/>
            </Container>
        </>
    )
}