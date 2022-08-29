import React, {useState, } from 'react';
import {useQuery} from "react-query";
import Item from './Item/Item';
import Cart from "./Cart/Cart"
import Drawer from "@mui/material/Drawer";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import { Wrapper, StyledButton} from './App.styles';

export type CartItemType = {
  id: number;
  image: string;
  price: number;
  desc: string;
  amount: number;
  title: string;
  category: string;
}

const getProduct = async (): Promise<CartItemType[]> => await (await fetch("https://fakestoreapi.com/products")).json(); 

export default function App(){
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>("products", getProduct);

  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  if (isLoading) return <CircularProgress />;
  if (error) return <div>something is wrong</div>;
 
  const getCartTotal = (items: CartItemType[]) => null;
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItem(prev => {

      // is the item added to cart
      const isItAndItem = prev.find(item => item.id === clickedItem.id);
      console.log(isItAndItem);
      if (isItAndItem) {
        return prev.map(item => 
          item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item
        );
      }

      // first the items is added to cart
      return [...prev, {...clickedItem, amount: 1}]
    }) 
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItem( prev => 
      prev.reduce((acc, item) => {
        if(item.id === id) {
          if(item.amount === 1) return acc; 
          return [...acc, {...item, amount: item.amount - 1}];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])    
    )  
  };
  
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItem} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getCartTotal(cartItem)} color='error'><AddShoppingCart /></Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      <h2>Total: $ {getTotalItems(cartItem).toFixed(2)}</h2>
    </Wrapper>
  )
}