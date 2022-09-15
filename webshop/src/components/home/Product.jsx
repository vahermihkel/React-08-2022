import Button from 'react-bootstrap/Button'; 
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function Product(props) {
  const { t } = useTranslation();

                      //{product} --> {product: {id: 312, name: "dasd"}, quantity: 1}
  const addToCart = (productClicked) => {
    let cart = sessionStorage.getItem("cart");  // localStorage vs sessionStorage <- sessionStorage kaob brauseri sulgumisel
    cart = JSON.parse(cart) || [];
    // 0,1,2,3,4,5,6,7,8..... kui ta on olemas
    // -1 <--- kui pole olemas
    const index = cart.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      // suurenda kogust
      // otsin ta järjekorranumbriga üles ja muudan kogust
      cart[index].quantity = cart[index].quantity + 1;
    } else {
      cart.push({product: productClicked, quantity: 1}); // [{},{},{product}]
    }
    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);
    toast.success(t("toast.cart-added"), {
      theme: "dark",
      position: "bottom-right"
    });
  }

  return ( 
    <div>
      <img src={props.element.image} alt="" />
      <div>{props.element.name}</div>
      <div>{props.element.price}</div>
      <Button onClick={() => addToCart(props.element)}>Lisa ostukorvi</Button>
    </div> );
}

export default Product;