import { useRef } from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import styles from "../css/Cart.module.css";
import CartSumContext from "../store/CartSumContext";
import emailjs from 'emailjs-com';

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  const [parcelMachines, setParcelMachines] = useState([]);
  const pmRef = useRef();
  const cartSumCtx = useContext(CartSumContext);

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(data => setParcelMachines(data.filter(e => e.A0_NAME === "EE")))
  }, []);

  const sendEmail = () => {

    // emailjs.sendForm('service_opxsefn', 'template_cxiuwse', calculateCartSum(), 'Xbn0xj_4LjNugxYGl')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });
    const templateParams = {
      message: "Keegi tegi tellimuse summas: " + calculateCartSum(),  // Saime sinu tellimuse ilusti kätte, saadame koheselt kui on makstud.
      from_name: 'Mihkel', // nameRef.current.value
      to_name: "Webshop", 
      // from_email: fromEmailRef.current.value
    };
   
    emailjs.send('service_opxsefn', 'template_cxiuwse', templateParams, 'Xbn0xj_4LjNugxYGl')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });

  };

  // eemaldamine ostukorvist
  const removeFromCart = (index) => {
    cart.splice(index,1);
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
    cartSumCtx.setCartSum(calculateCartSum());
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
    cartSumCtx.setCartSum(0);
  }

  // HTML-s ostukorvi esemete tk näitamine

  const decreaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity - 1;
    if (cart[index].quantity <= 0) {
      removeFromCart(index);
    }
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
    cartSumCtx.setCartSum(calculateCartSum());
  }

  const increaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity + 1;
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
    cartSumCtx.setCartSum(calculateCartSum());
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

      <button onClick={sendEmail}>Kinnita tellimus</button>
  </div> );
}

export default Cart;