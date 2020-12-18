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

    const [tableNumbers, setTableNumbers] = useState(null);
    const [items, setItems] = useState([]);

    const isValidTableNumbers = (e) => {
        if(e == null)
            return true
        return /^([0-9]+(-[0-9]+)?)(,[0-9]+(-[0-9]+)?)*$/.test(e);
    }

    const updateTableNumbers = event => {
        setTableNumbers(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(tableNumbers != null && isValidTableNumbers(tableNumbers)) {
            setItems(handleInput(tableNumbers));
        }
        else if(tableNumbers != null) {
            setTableNumbers("")
        }
    }

    const handleInput = (expression) => {
        let result = [];
        let terms = expression.split(/,/);
        for (let t in terms) {
            result = result.concat(expandTerm(terms[t]));
        }
        return result;
    }

    function getFactors(term) {
        let matches = term.match(/([0-9]+)-([0-9]+)/);
        if (!matches) return {first:Number(term), last:Number(term)};
        return {first:Number(matches[1]), last:Number(matches[2])};
    }

    function expandTerm(term) {
        let factors = getFactors(term);
        if (factors.length < 2) return [factors.first];
        let range = [];
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
                            <TextField value={tableNumbers} onChange={(e) => {
                                updateTableNumbers(e);
                                isValidTableNumbers(tableNumbers);
                            }} id="outlined-basic"
                                       label="Table numbers" variant="outlined" required autoFocus
                                       error={!isValidTableNumbers(tableNumbers)}
                                       helperText={isValidTableNumbers(tableNumbers)? '' : 'Invalid Input'}
                            />
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