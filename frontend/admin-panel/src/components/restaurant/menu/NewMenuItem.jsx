import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

const NewMenuItem = (props) => {
    const classes = useStyles();

    const [item,setItem] = useState({});


    // const [category, setCategory] = useState("");
    // const handleChange = (event) => {
    //     setCategory(event.target.value);
    // };
    // console.log(category)

    let menu =props.menu
    console.log(menu);
    //console.log(item)
   // console.log(props.menu)
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField onChange={(e)=>{
                let i= item;
                i.name = e.target.value;
                setItem(i);
                //console.log(item)
            }} id="outlined-basic" label="Name" variant="outlined" />
            <TextField onChange={(e)=>{
                let i= item;
                i.price = e.target.value
                setItem(i);
                //console.log(item)
            }}
             id="outlined-basic" label="Price" variant="outlined" />
            {/* <TextField  onChange={(e)=>{
                let i= item;
                i.category = e.target.value
                setItem(i);
                //console.log(item)
            }}
             id="outlined-basic" label="Category" variant="outlined" /> */}
            {/* <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"Select category"}
                    onChange={(e)=>{
                        let i= item;
                i.category = e.target.value
                setItem(i)
                    }}
                >
                    {menu.hasOwnProperty("categories")?menu.categories.map((item,index)=><MenuItem key={index} value={item}>{item}</MenuItem>):<MenuItem  value={"No categories"}>No categories</MenuItem>} 
                </Select>
            </FormControl> */}
            <TextField 
                 onChange={(e)=>{
                let i= item;
                i.img = URL.createObjectURL(e.target.files[0])
                setItem(i);
                //console.log(item)
            }}
             type="file" />
            <Button 
            onClick={(e)=>{
                e.preventDefault()
                menu.items.push(item)
                sessionStorage.setItem("menu",JSON.stringify(menu))
                props.refreshMenu(menu)
               }}
            type="submit"
                    variant="contained"
                    color="primary">Save</Button>
        </form>
    );
}


export default NewMenuItem;