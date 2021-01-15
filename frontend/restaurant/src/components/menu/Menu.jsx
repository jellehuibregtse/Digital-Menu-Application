import React, { useState } from 'react';
import '../../css/menu.css';
import '../../css/orderBar.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dish from './Dish';
import { useStateValue } from '../../context/stateProvider';
import SearchBar from './SearchBar';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "2%"
    },
    dish: {
        textAlign: 'center',
    },
}));


const Menu = (props) => {

    const classes = useStyles();
    const [selectedCategory, setCategory] = useState("");
    const [selectedIngredients, setIngredients] = useState([]);

    const onSelectedCategoryOption = (selectedCategory) => {
        setCategory(selectedCategory);
    }
    const onCheckedIngredientOption = (selectedIngredients) => {
        setIngredients(selectedIngredients);
    }

    if(typeof props.menu.items !== 'undefined' && props.menu.items.length === 0) {
        props.menu.items = [
            {
                id: 0,
                name: 'item 1',
                price: 1,
                ingredients: [
                    {
                        id: 0,
                        name: 'ingredient 1'
                    }
                ],
                category: {
                    id: 0,
                    name: 'category 1'
                }
            },
            {
                id: 1,
                name: 'item 2',
                price: 1,
                ingredients: [
                    {
                        id: 1,
                        name: 'ingredient 2'
                    }
                ],
                category: {
                    id: 1,
                    name: 'category 2'
                }
            }
        ]
    }

    let ingredients;
    if (props.menu !== null) {
        ingredients = props.menu.items
            .filter(item => item.ingredients.length > 0)
            .map(item => item.ingredients)
            .map(ingredient => ingredient.map(item => item.name))
        ingredients = ingredients.flat(1);
        ingredients = new Set(ingredients)
        ingredients = Array.from(ingredients);
    }

    //First map the items according to selected category
    let filteredItems = typeof props.menu !== 'undefined' ?
        props.menu.items.filter(item => item.category.name.includes(selectedCategory)) :
        null;

    //Then we filter by selected ingredients
    if (selectedIngredients.length !== 0) {
        filteredItems = filteredItems
            .filter(item => item.ingredients.some(i => selectedIngredients.includes(i.name)))
    }

    //Display Dish Component for every filtered item
    const itemsList = filteredItems.map(item => {
        return (
            <>
                <Grid className={classes.dish} key={item.id + 1000} item xs={6} sm={3}>
                    <Dish
                        name={item.name}
                        price={item.price}
                        key={item.id}
                        id={item.id}
                        ingredients={item.ingredients}
                    />
                </Grid>
            </>
        )
    })
    console.log(ingredients);
    
    return (
        <>
            <div className={classes.root}>
                <SearchBar
                    categories={props.menu.categories.map(i => i.name)}
                    ingredients={ingredients}
                    category={selectedCategory}
                    onSelect={onSelectedCategoryOption}
                    onCheck={onCheckedIngredientOption} />
                <Grid key={1} container spacing={3}>
                    {itemsList}
                </Grid>
            </div>

        </>
    )
}

export default Menu;