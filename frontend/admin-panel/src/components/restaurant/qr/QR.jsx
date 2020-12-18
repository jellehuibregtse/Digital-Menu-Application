import React, {useEffect, useState} from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    content: {
        width: '100%',
        padding: theme.spacing(3),
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    }
}))

export default (props) => {
    const classes = useStyles();

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getQRCode();
    }, []);

    const getQRCode = async () => {
        setLoading(true);
        await fetch(process.env.REACT_APP_GATEWAY_URL + "/api/qr-service/qr-codes",
            {
                method: 'POST',
                body: process.env.REACT_APP_RESTAURANT_URL + "/qr?restaurantId=" + props.id + "&tableId=1",
                headers: {
                    "Content-Type": "text/plain",
                    "accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive",
                    'Authorization': localStorage.getItem('token')
                }
            }
        ).then(response => response.blob())
            .then(blob => setImage(URL.createObjectURL(blob)));
        setLoading(false);
    }

    return (
        <Container className={classes.content}>
            {loading ?
                <CircularProgress/> :
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={image}/>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <strong>{props.name}</strong>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Table 1
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {process.env.REACT_APP_RESTAURANT_URL + "/qr?restaurantId=" + props.id + "&tableId=1"}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="primary" onClick={() => {
                                        let tempLink = document.createElement('a');
                                        tempLink.href = image;
                                        tempLink.setAttribute('download', 'qr.png');
                                        tempLink.click();
                                    }}>
                                        Download
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            }
        </Container>
    )
}