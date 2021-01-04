import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useEffect } from 'react';
import MessagingService from '../../../services/MessagingService'
const getMenuById = (id) => {
    return MessagingService.fetchHandler("GET", `/api/menu-service/menus/${id}`)
}
const updateMenu = (menu)=>{
    return MessagingService.fetchHandler("PUT", `/api/menu-service/menus/${menu.id}`,menu).then(r=>window.location.href="./")
}
export default function EditMenuDialog(props) {
    const [open, setOpen] = useState(props.isOpen);
    const [menu, setMenu] = useState({})

    
    const handleClose = () => {
        props.closeDialog();
    };

   

    useEffect(() => {
        props.menuId !== -1 ? getMenuById(props.menuId).then(r => setMenu(r)) : setMenu({})
    }, [props.menuId])

    useEffect(() => {
        props.isOpen ? setOpen(true) : setOpen(false)
    }, [props.isOpen])

    console.log(menu)
    if (menu.hasOwnProperty("categories")&&menu.hasOwnProperty("name")) {
        
        return (
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit {menu.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Here you can modify menu name and category list
          </DialogContentText>
                        <TextField
                            id="name"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            helperText="type your menu name"
                            defaultValue={menu.name}
                            autoFocus
                            onChange={(e) => {
                                let name = e.target.value;
                                let m = menu;
                                m.name = name
                                setMenu(m);
                            }}
                        />
                        <TextField
                            id="cat"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            defaultValue={menu.categories.map(item=>item.name).join(",")}
                            helperText="type your category names separated by comma"
                            autoFocus
                            onChange={(e) => {
                                let categories = e.target.value.split(",")
                                let c = categories.map(item => {
                                    return { id: 0, name: item }
                                })
                                let m = menu;
                                m.categories = c;
                                setMenu(m)
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary">
                            Exit
          </Button>
                        <Button onClick={(e)=>updateMenu(menu)} variant="contained" color="primary">
                            Save Changes
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    } else {
        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>Loading...</DialogContentText>
                </DialogContent>
            </Dialog>
        )
    }
}