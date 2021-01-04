import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MessagingService from '../../../services/MessagingService';
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '47%',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const getMenuCategories = (id)=>{
    return MessagingService.fetchHandler("GET", `/api/menu-service/menus/${id}`)
}
const addMenuItem=(id,item)=>{
    console.log(item)
    return MessagingService.fetchHandler("PUT",`/api/menu-service/menus/addMenuItem/${id}`,item)
}
const NewMenuItem = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const { id } = useParams();
    const [item, setItem] = useState({});

    const [menuCategories,setMenuCategories] = useState([]);
    const [category, setCategory] = useState("");

    const handleChange = (event) => {
        setCategory(event.target.value);
    };
   

    
    
    useEffect(() => {
        getMenuCategories(id).then(r=>setMenuCategories(r.categories))
    }, id)


    console.log(category)
    if(menuCategories===[]){
        return <h2>Loading...</h2>
    }else{
        
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField onChange={(e) => {
                let i = item;
                i.name = e.target.value;
                setItem(i);
                //console.log(item)
            }} id="outlined-basic" label="Name" variant="outlined" />
            <TextField onChange={(e) => {
                let i = item;
                i.price = e.target.value
                setItem(i);
                //console.log(item)
            }}
                id="outlined-basic" label="Price" variant="outlined" />
             <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={(e)=>{
                        let i= item;
                i.category = menuCategories.find(item=>item.name===e.target.value)

                setCategory(e.target.value)
                    }}
                >
                    {menuCategories.map((item,index)=><MenuItem key={index} value={item.name}>{item.name}</MenuItem>)} 
                </Select>
            </FormControl> 
            <TextField
                onChange={(e) => {
                    let i = item;
                    i.img = URL.createObjectURL(e.target.files[0])
                    setItem(i);
                    //console.log(item)
                }}
                type="file" />
            <Button
                onClick={(e) => {
                    e.preventDefault()
                   
                    addMenuItem(id,item)
                    history.goBack();
                }}
                type="submit"
                variant="contained"
                color="primary">Save</Button>
        </form>
    );
            }
}


export default NewMenuItem;