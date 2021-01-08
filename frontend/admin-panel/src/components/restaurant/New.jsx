import React, {useState} from 'react';
import {Button, Container, TextField, Typography} from "@material-ui/core";
import Validate from "../restaurant/Validate";
import MessagingService from "../../services/MessagingService";

export default () => {
    const [name, setName] = useState(null);

    const [nameAvailable, setNameAvailable] = useState(null);

    const transformName = (name) => {
        let nameCopy = name;
        if (name !== null) {
            nameCopy = nameCopy.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (nameCopy.charAt(0) === '-') {
                nameCopy = nameCopy.substring(1);
            }
            if (nameCopy.charAt(nameCopy.length - 1) === '-') {
                nameCopy = nameCopy.slice(0, -1);
            }
        }
        return nameCopy;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const transformedName = transformName(name);
        if (Validate.isValidName(name) && nameAvailable) {
            await MessagingService.fetchHandler('POST', '/api/restaurant-service/restaurants', {
                name: transformedName,
                displayName: name,
                tableCount: 10
            })
                .then(() => document.location.href = '/');
        } else if (name === null)
            setName('');
    }

    return (
        <Container>
            <Typography variant="h4">Create a new restaurant</Typography>
            <form noValidate onSubmit={submitHandler}>
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
                        if(Validate.isValidName(e.target.value) === true)
                            await Validate.nameAvailable(transformName(e.target.value)).then(r => setNameAvailable(r)).catch();
                    }}
                    error={Validate.isValidName(name) !== true ? true : nameAvailable === false}
                    helperText={Validate.isValidName(name) !== true ? Validate.isValidName(name) : nameAvailable === false ? 'Restaurant name was already taken!' : ''}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Create restaurant
                </Button>
            </form>
        </Container>
    )
}