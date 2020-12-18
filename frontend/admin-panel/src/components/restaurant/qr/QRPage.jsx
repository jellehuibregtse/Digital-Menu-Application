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
    const [items, setItems] = useState([]);

    const updateTableNumbers = event => {
        setTableNumbers(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setItems(handleInput(tableNumbers));
    }

    const handleInput = (expression) => {
        let result = [];
        const terms = expression.split(/,/);
        for (const t in terms) {
            result = result.concat(expandTerm(terms[t]));
        }

        return result;
    }

    function getFactors(term) {
        const matches = term.match(/(-?[0-9]+)-(-?[0-9]+)/);
        if (!matches) return {first:Number(term)};
        return {first:Number(matches[1]), last:Number(matches[2])};
    }

    function expandTerm(term) {
        const factors = getFactors(term);
        if (factors.length < 2) return [factors.first];
        const range = [];
        for (let n = factors.first; n <= factors.last; n++) {
            range.push(n);
        }
        return range;
    }

    return (
        <Container className={classes.content}>
            <Box mb={2}>
                <Typography variant="h5">QR Codes</Typography>
            </Box>
            <Box mb={4}>
                <form onSubmit={handleSubmit}>
                    <Grid container justify="flex-start" alignItems="center">
                        <Grid item>
                            <TextField value={tableNumbers} onChange={updateTableNumbers} id="outlined-basic"
                                       label="Table numbers" variant="outlined" required autoFocus/>
                        </Grid>
                        <Grid item>
                            <Box ml={1}>
                                <Button variant="contained" color="primary" type="submit">
                                    Generate QR Codes
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>

            <Grid container spacing={2}>
                {items.map(i =>
                    <Grid item>
                        <QR id={props.id} name={props.name} table={i}/>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}