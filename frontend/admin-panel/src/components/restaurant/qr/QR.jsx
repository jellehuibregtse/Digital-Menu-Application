import React, {useEffect, useState} from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles((theme) => ({
    content: {
        width: '100%',
        padding: theme.spacing(3)
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
                body: "google.com",
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
            <Typography variant="h5">QR Code</Typography>
            {loading ?
                <CircularProgress/> :
                <img alt="home" src={image}/>
            }
        </Container>
    )
}