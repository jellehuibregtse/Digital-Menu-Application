import React from 'react';
import { render } from '@testing-library/react';
import Dish from './components/menu/Dish';
import NavBar from './components/NavBar';

test('Render Dish Component', () => {
  const { getByText } = render(<Dish 
    name={"Steak"}
    price={19.99}
    id={1}/>);
  const itemName = getByText(/Steak/i);
  const itemPrice = getByText(/19.99/i);
  expect(itemName).toBeInTheDocument();
  expect(itemPrice).toBeInTheDocument()
});
 
