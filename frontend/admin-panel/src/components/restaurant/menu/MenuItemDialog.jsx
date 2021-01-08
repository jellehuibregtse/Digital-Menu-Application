import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MessagingService from '../../../services/MessagingService'
import { useParams } from 'react-router-dom';

const getItemById = (id) => {
    return MessagingService.fetchHandler("GET", `/api/menu-service/menus/menuitem/${id}`)
}

const updateMenuItem = (menuId, item) => {
console.log(item)
    return MessagingService.fetchHandler("PUT", `/api/menu-service/menus/updateMenuItem/${menuId}`, item);

}
const deleteMenuItem = (menuId, item) => {

    return MessagingService.fetchHandler("PUT", `/api/menu-service/menus/deleteMenuItem/${menuId}`, item);

}
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function MenuItemDialog(props) {
    const classes = useStyles();

    const { id } = useParams();

    const [open, setOpen] = useState(props.isOpen);
    const [menuItem, setMenuItem] = useState({})
    const [editedItem, setEditedItem] = useState({});

    const [category, setCategory] = useState("")
    useEffect(() => {
        props.itemId !== -1 ? getItemById(props.itemId).then(r => setMenuItem(r)) : setMenuItem({})
    }, [props.itemId])

    useEffect(() => {
        props.isOpen ? setOpen(true) : setOpen(false)
    }, [props.isOpen])


    const handleClose = () => {
        props.closeDialog();
        setMenuItem({})
        setCategory("")
    };

    const handleChange = (e) => {
        setCategory(e.target.value)
    }

    const saveChanges =  (e) => {
        let i = menuItem;
        i.category =  props.categories.find(k => k.name === category)
        console.log(i)
        updateMenuItem(id, i)
            .then(r => window.location.href = "./");
    }
    const onDeleteClick = (e) => {

        deleteMenuItem(id, menuItem)
            .then(r => window.location.reload());
    }
    console.log(props)
    if (menuItem.hasOwnProperty("name") && props.type === "EDIT") {

        return (
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Menu Item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Here you can modify selected menu item
          </DialogContentText>
                        <TextField
                            id="name"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            helperText="type your menu item name"
                            defaultValue={menuItem.name}
                            autoFocus
                            onChange={(e) => {
                                let name = e.target.value;
                                let m = menuItem;
                                m.name = name
                                setEditedItem(m);
                            }}
                        />
                        <TextField
                            id="picture" size="small" variant="outlined"
                            margin="normal" type="file" required autoFocus />

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                onChange={handleChange}
                            >
                                {props.categories.map(item => <MenuItem value={item.name}>{item.name}</MenuItem>)}

                            </Select>
                        </FormControl>
                        <TextField
                            id="price"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            helperText="type your menu item price"
                            defaultValue={menuItem.price}
                            autoFocus
                            onChange={(e) => {
                                let price = e.target.value;
                                let m = menuItem;
                                m.price = price;
                                setEditedItem(m);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary">
                            Exit
          </Button>
                        <Button onClick={saveChanges} variant="contained" color="primary">
                            Save Changes
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    } else if (menuItem.hasOwnProperty("name") && props.type === "DELETE") {
        console.log(props)
        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Are you sure you want to delete <strong>{menuItem.name}</strong> from this menu</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Exit
                    </Button>
                    <Button onClick={onDeleteClick} variant="contained" color="secondary">
                        Delete
                     </Button>
                </DialogActions>
            </Dialog>
        )
    } else {
        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>Loading...</DialogContentText>
                </DialogContent>
            </Dialog>
        )
    }
}