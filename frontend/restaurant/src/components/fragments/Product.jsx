import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../css/product.css';
import { useStateValue } from '../../context/stateProvider';
const Product = (props) => {
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
          € {props.price.toFixed(2)}
        </Typography>
        <Button id={props.id} onClick={onClickHandler} variant="outlined">Add to order</Button>
      </CardContent>
    </Card>
  );
}

export default Product;