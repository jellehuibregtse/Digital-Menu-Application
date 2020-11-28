import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Dish from './components/menu/Dish';
import NavBar from './components/NavBar';
import App from './App';
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
test('Render Navbar Component', () => {
  const {app} = render(<App/>)
  const {container} = render(<NavBar/>);
  const link = container.querySelector(".makeStyles-icon-3")
  fireEvent.mouseOver(container.querySelector(".MuiSvgIcon-root makeStyles-root-2 MuiSvgIcon-fontSizeLarge"))
  expect(link.getAttribute('href')).toBe("/basket")
  const basketIcon = container.querySelector(".MuiSvgIcon-root makeStyles-root-2 MuiSvgIcon-fontSizeLarge")
  fireEvent.click(basketIcon)
  expect(link.getAttribute('href')).toBe('/')
});
 
