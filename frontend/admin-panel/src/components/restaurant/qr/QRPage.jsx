import React, {useState} from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import QR from "./QR";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    content: {
        width: '100%',
        padding: theme.spacing(3),
        flexGrow: 1
    }
}))

export default (props) => {
    const classes = useStyles();

    const [tableNumbers, setTableNumbers] = useState("");

    const updateTableNumbers = event => {
        setTableNumbers(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(tableNumbers)
    }

    return (
        <Container className={classes.content}>
            <Box mb={2}>
                <Typography variant="h5">QR Codes</Typography>
            </Box>
            <Box mb={4}>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item>
                        <form onSubmit={handleSubmit}>
                            <TextField value={tableNumbers} onChange={updateTableNumbers} id="outlined-basic"
                                       label="Table numbers" variant="outlined" required autoFocus/>
                        </form>
                    </Grid>
                    <Grid item>
                        <Box ml={1}>
                            <Button variant="primary" type="submit">
                                Generate QR Codes
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={2}>
                <Grid itemf>
                    <QR id={props.id} name={props.name}/>
                </Grid>
            </Grid>
        </Container>
    )
}