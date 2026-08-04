import { useCallback, useState } from 'react';
import { CartContext } from './CartContext';
import { getProductById } from '../../data/products';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const getCartItemsWithProducts = useCallback(() => {
    return cartItems
      .map(item => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter(item => item.product);
  }, [cartItems]);

  const addToCart = useCallback(
    productId => {
      const existing = cartItems.find(item => item.id === productId);

      if (existing) {
        const updatedQty = cartItems.map(item =>
          item.id === productId ? { id: productId, quantity: existing.quantity + 1 } : item,
        );
        setCartItems(updatedQty);
      } else {
        const newItem = { id: productId, quantity: 1 };
        setCartItems([...cartItems, newItem]);
      }
    },
    [cartItems],
  );

  const removeFromCart = useCallback(
    productId => {
      const newItems = cartItems.filter(item => item.id !== productId);
      setCartItems(newItems);
    },
    [cartItems],
  );

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity < 1) {
        removeFromCart(productId);
        return;
      }
      setCartItems(cartItems.map(item => (item.id === productId ? { ...item, quantity } : item)));
    },
    [cartItems, removeFromCart],
  );

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartItemsWithProducts, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
