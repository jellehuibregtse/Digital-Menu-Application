import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../../css/product.css';
import { useStateValue } from '../../context/stateProvider';
const Dish = (props) => {
  const [state, update] = useStateValue();
  const onClickHandler = (e) => {
    console.log(e.target.parentNode.id)
    update({
      type: "Add to cart",
      item: {
        id: props.id,
        name: props.name,
        price: props.price
      }
    })
  }
  return (

    <Card className="card" variant="outlined">
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          {props.name.toUpperCase()}
        </Typography>
        <Typography variant="body2" component="p">
          € {props.price ? props.price.toFixed(2) : "-"}
        </Typography>
        {/* <List component="div" aria-label="secondary mailbox folders">
        <ListItem>
          <ListItemText itemType="p" primary="Trash" />
        </ListItem>
      </List> */}
        <Button id={props.id} onClick={onClickHandler} variant="outlined">Add to order</Button>
        {
          props.ingredients.length>0?
          <Typography variant="body2" component="p">
            includes: {props.ingredients.map(i => i.name).join(",")}
          </Typography>:null
        }
      </CardContent>
    </Card>
  );
}

export default Dish;