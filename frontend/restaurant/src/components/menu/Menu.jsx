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
    
    //First map the items according to selected category
    let filteredItems = typeof props.menu !== 'undefined' ?
        props.menu.items
            .filter(item => item.category.name.includes(selectedCategory)) : null;

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
    
    return (
        <>
            <div className={classes.root}>
                <SearchBar 
                categories={props.menu.categories.map(i=>i.name)}
                ingredients={props.menu.ingredients.map(i=>i.name)} 
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