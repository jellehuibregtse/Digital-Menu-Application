import React, {useState} from 'react';
import {Container, TextField, Typography} from "@material-ui/core";
import Validate from "../restaurant/Validate";

export default () => {
    const [name, setName] = useState(null);

    const [nameAvailable, setNameAvailable] = useState(null);

    return (
        <Container>
            <Typography variant="h4">Create a new restaurant</Typography>
            <form>
                <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Restaurant name"
                    autoFocus
                    onChange={async (e) => {
                        setName(e.target.value);
                        setNameAvailable(null);
                        await Validate.nameAvailable(e.target.value).then(r => setNameAvailable(r));
                    }}
                    error={Validate.isValidName(name) !== true ? true : nameAvailable === false}
                    helperText={Validate.isValidName(name) !== true ? Validate.isValidName(name) : nameAvailable === false ? 'Restaurant name was already taken!' : ''}
                />
            </form>
        </Container>
    )
}