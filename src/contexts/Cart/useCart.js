import { useContext } from 'react';
import { CartContext } from './CartContext';

export function useCart() {
  const cart = useContext(CartContext);

  return cart;
}
