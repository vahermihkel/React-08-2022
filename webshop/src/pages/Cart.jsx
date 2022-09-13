import { useRef } from "react";
import { useEffect, useState } from "react";
import styles from "../css/Cart.module.css";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  const [parcelMachines, setParcelMachines] = useState([]);
  const pmRef = useRef();

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(data => setParcelMachines(data.filter(e => e.A0_NAME === "EE")))
  }, []);

  // eemaldamine ostukorvist
  const removeFromCart = (index) => {
    cart.splice(index,1);
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  // ostukorvi kogusumma
  const calculateCartSum = () => {
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
    return cartSum.toFixed(2);
  }

  const calculateCartItems = () => {
    let cartItems = 0;
    cart.forEach(element => cartItems = cartItems + element.quantity);
    return cartItems;
  }

  // ostukorvi tühjendamine
  const emptyCart = () => {
    setCart([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
  }

  // HTML-s ostukorvi esemete tk näitamine

  const decreaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity - 1;
    if (cart[index].quantity <= 0) {
      removeFromCart(index);
    }
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  const increaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity + 1;
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  const [selectedPM, setSelectedPM] = useState("");

  const pmSelected = () => {
    setSelectedPM(pmRef.current.value);
  }

  return ( 
  <div>
    {/* Ostukorvis on 4 eset */}
    { cart.length === 0 && <div>Ostukorv on tühi!</div> } 
    { cart.length > 0 && <button className={styles.info} onClick={emptyCart}>Tühjenda ostukorv</button>}
    { cart.length > 0 && <div className={styles.info}>Ostukorvis on {cart.length} erinevat eset</div>}
    { cart.length > 0 && <div className={styles.info}>Ostukorvis on kokku {calculateCartItems()} eset</div>}
    {cart.map((element, index) => 
      <div className={styles.product} key={element.product.id}>
        <img className={styles.image} src={element.product.image} alt="" />
        <div className={styles.name}>{element.product.name}</div>
        <div className={styles.price}>{element.product.price} €</div>
        <div className={styles.quantityControls}>
          <img className={styles.button} onClick={() => decreaseQuantity(index)} src={require("../images/minus.png")} alt="" />
          <div className={styles.quantity}>{element.quantity} tk</div>
          <img className={styles.button} onClick={() => increaseQuantity(index)} src={require("../images/plus.png")} alt="" />
        </div>
        <div className={styles.total}>{(element.product.price * element.quantity).toFixed(2)} €</div>
        <img className={styles.button} onClick={() => removeFromCart(index)} src={require("../images/delete.png")} alt="" />
      </div>
    )}
    { cart.length > 0 && 
      <div className={styles.info}>
        <select onChange={pmSelected} ref={pmRef}>
          { parcelMachines.map(element => <option>{element.NAME}</option>) }
        </select>
        { selectedPM !== "" && <div className={styles.info}>Valitud pakiautomaat: {selectedPM}</div>} 
      </div>}
    { cart.length > 0 && <div className={styles.info}>{calculateCartSum()} €</div>}

   
   {/* reactis: props */}
  </div> );
}

export default Cart;