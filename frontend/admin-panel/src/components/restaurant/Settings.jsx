import React ,{useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@material-ui/core";
import MessagingService from "../../services/MessagingService";
import Popup from "reactjs-popup";
import {Delete, People,Settings} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0)
    },
    content: {
        marginTop: theme.spacing(3)
    }
}))

const deleteRestaurant = (id) => {
    MessagingService.fetchHandler('DELETE', '/api/restaurant-service/restaurants/' + id)
        .then(() => document.location.href = "/");
}

const saveRestaurant = (newName)=>{

    //MessagingService.fetchHandler("UPDATE")
}
export default (props) => {
    const classes = useStyles();

    const [name,setName] = useState("");
    return (
        <Container className={classes.content}>
            <Typography variant="h5">Settings</Typography>
            
            <List>
                <ListItem button className={classes.listItem} onClick={() => deleteRestaurant(props.id)}>
                    <ListItemAvatar>
                        <Avatar>
                            <Delete/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        Delete restaurant
                    </ListItemText>
                </ListItem>
            </List>
            <Popup trigger={
                <ListItem button className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar>
                            <People/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        Invite people to restaurant
                    </ListItemText>
                </ListItem>}>
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
                        Invite
                    </Button>
                    <List>

                    </List>
                </Box>
            </Popup>
            <Popup trigger={
                <ListItem button className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar>
                        <Settings/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText>
                    Change restaurant name
                </ListItemText>
            </ListItem>}>
                <Box>
                    <TextField
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="New restaurant name"
                        onChange={(e)=>setName(e.target.value)}
                    />
                    {name!==""?
                    <Button onClick={(e)=>saveRestaurant(name)} fullWidth variant="outlined">
                        Save
                    </Button>:null}
                </Box>
            </Popup>
        </Container>
    )
}