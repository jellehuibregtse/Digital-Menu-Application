import React ,{useState} from 'react';
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
    const [category,setCategory] = useState("");
    const [ingredients,setIngredients] = useState([]);

    const onSelectedCategoryOption =(selectedCategory)=>{
        setCategory(selectedCategory);
    }
    const onCheckedIngredientOption =(selectedIngredients)=>{
        setIngredients(selectedIngredients);
    }
    console.log(ingredients)
    
    const itemsList = typeof props.menu !== 'undefined' ? 
    props.menu.items
    .filter(i=>i.category.includes(category))
    .map(item => {
        return (
            <>
                <Grid className={classes.dish} key={item.id+1000} item xs={6} sm={3}>
                    <Dish
                        name={item.name}
                        price={item.price}
                        key={item.id}
                        id={item.id}
                    />
                </Grid>
            </>
        )
    }) : null;

    return (
        <>
            <div className={classes.root}>
                <SearchBar category={category} onSelect={onSelectedCategoryOption}
                onCheck={onCheckedIngredientOption}/>
                <Grid key={1} container spacing={3}>
                    {itemsList}
                </Grid>
            </div>

        </>
    )
}

export default Menu;