import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);

  // eemaldamine ostukorvist

  // ostukorvi kogusumma

  // ostukorvi tühjendamine

  // HTML-s ostukorvi esemete tk näitamine

  return ( 
  <div>
    {cart.map(element => 
      <div key={element.id}>
        <img src={element.image} alt="" />
        <div>{element.name}</div>
        <div>{element.price}</div>
        <button>X</button>
      </div>
    )}
  </div> );
}

export default Cart;