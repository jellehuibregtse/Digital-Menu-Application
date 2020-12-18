import React, {useEffect, useState} from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) => ({
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
                body: process.env.REACT_APP_RESTAURANT_URL + "/qr?restaurantId=" + props.id + "&tableId=" + props.table,
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
        <div>
            {loading ?
                <CircularProgress/> :
                <Paper className={classes.paper}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
                        <Grid container justify="center" alignItems="center" spacing={2}>
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
                                            Table {props.table}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {process.env.REACT_APP_RESTAURANT_URL + "/qr?restaurantId=" + props.id + "&tableId=" + props.table}
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid container justify="center" alignItems="center" spacing={2}>
                                <Grid item>
                                    <Box mb={2}>
                                        <Button variant="primary" onClick={() => {
                                            let tempLink = document.createElement('a');
                                            tempLink.href = image;
                                            tempLink.setAttribute('download', 'qr.png');
                                            tempLink.click();
                                        }}>
                                            Download
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                    </Grid>


                    </Grid>
                </Paper>
            }
        </div>
    )
}