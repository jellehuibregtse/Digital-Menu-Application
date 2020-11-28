import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../context/stateProvider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Container } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        flexGrow: 1,
        padding: 0,
        marginTop: "2%",
        marginBottom: "2%"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ITEM_HEIGHT = 55;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
// const ingredients = [
//     "MEAT", 'SOYA', 'FISH',"MILK"
// ];
const SearchBar = (props) => {

    const [selectedCategory, setSelectedCategory] = useState("All")
    const classes = useStyles();

    const [selectedIngredient, setIngredient] = useState([]);

    const handleChangeIngredients = (event) => {
        setIngredient(event.target.value);
        props.onCheck(event.target.value)
    };


    const handleChangeCategory = (event) => {
        setSelectedCategory(event.target.value)
        props.onSelect(event.target.value);
    };
    //console.log(selectedCategory)
    //console.log(selectedIngredient)
    return (
        <Container className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    Category
                </InputLabel>
                <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    value={selectedCategory}
                    onChange={handleChangeCategory}
                    className={classes.selectEmpty}
                >
                    <MenuItem value={""}>
                        <em>All</em>
                    </MenuItem>
                    {props.categories.map(i=>{
                        return(
                            <MenuItem key={i} value={i}>{i}</MenuItem>
                        )
                    })}
                    {/* <MenuItem value={"SALAD"}>Salads</MenuItem>
                    <MenuItem value={"MAIN"}>Main dishes</MenuItem>
                    <MenuItem value={"SIDE"}>Side dishes</MenuItem>
                    <MenuItem value={"DESSERT"}>Desserts</MenuItem>
                    <MenuItem value={"BEVERAGE"}>Beverages</MenuItem> */}
                </Select>
            </FormControl>


            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Dish with</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={selectedIngredient}
                    onChange={handleChangeIngredients}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {props.ingredients.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedIngredient.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Container>
    )
}

export default SearchBar;