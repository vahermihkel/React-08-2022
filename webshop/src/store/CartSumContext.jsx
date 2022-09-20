import { createContext, useState } from "react";

const CartSumContext = createContext({
  cartSum: 0,
  setCartSum: (newCartSum) => {}
});

export const CartSumContextProvider = (props) => {
  const [cartSum, setCartSum] = useState(calculateCartSum());

  function calculateCartSum() {
    let cart = sessionStorage.getItem("cart");  
    cart = JSON.parse(cart) || [];
    let cartSumCalculated = 0;
    cart.forEach(element => cartSumCalculated = cartSumCalculated + element.product.price * element.quantity);
    return cartSumCalculated.toFixed(2);
  }

  return (
    <CartSumContext.Provider value={{
      cartSum: cartSum,
      setCartSum: setCartSum
    }}>
      {props.children}
    </CartSumContext.Provider>
  )
}

export default CartSumContext;