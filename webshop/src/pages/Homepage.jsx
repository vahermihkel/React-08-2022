// import productsFromFile from "../data/products.json";
import Button from 'react-bootstrap/Button'; 
import { useEffect, useState } from "react";
import Spinner from '../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const [products, setProducts] = useState([]); // <--- seda muudan
  const [dbProducts, setDbProducts] = useState([]); // <--- seda ei muuda kunagi
  const { t } = useTranslation();
  
  // [{},{},{}]
  // ["","",""]
  // js get unique values from array -> [...new Set([1,1,2])]  -> [1,2]
  const categories = [...new Set(dbProducts.map(element => element.category))];
  const [activeCategory, setActiveCategory] = useState("all");

        //   {    "scraping" python
        //     id: number;   <-- unikaalsuse jaoks
        //     image: string; <-- pildi väljanäitamise jaoks
        //     name: string; <-- nime väljanäitamise jaoks
        //     price: number; <-- hinna väljanäitamise jaoks + ostukorvis kokkuarvutamine
        //     description: string; <-- avalehel toote kirjeldust ei näe, aga toote peale klikkides näeb
        //     category: string; // <-- saan kategooriate lõikes filterdada 
        //     active: boolean; <-- näidatakse aktiivseid/mitteaktiivseid avalehel
        // }

  useEffect(() => { // uef algus
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(data => {
        setProducts(data || []);
        setDbProducts(data || []);
        });
  }, []); 

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

  const filterByCategory = (categoryClicked) => {
    if (categoryClicked === 'all') {
      setProducts(dbProducts);
      setActiveCategory("all");
    } else {
      const result = dbProducts.filter(element => element.category === categoryClicked);
      setProducts(result);
      setActiveCategory(categoryClicked);
    }  
  }

  const sortAZ = () => {
    products.sort((a,b) => a.name.localeCompare(b.name));
    setProducts(products.slice());
  }

  const sortZA = () => {
    products.sort((a,b) => b.name.localeCompare(a.name));
    setProducts(products.slice());
  }

  const sortPriceAsc = () => {
    products.sort((a,b) => a.price - b.price);
    setProducts(products.slice());
  }

  const sortPriceDesc = () => {
    products.sort((a,b) => b.price - a.price);
    setProducts(products.slice());
  }

  return ( 
  <div>
    <ToastContainer />
    <div> <i>Üksiku toote vaatamine kodus</i> </div>
    <div className={activeCategory === "all" ? "active-category": undefined} 
      onClick={() => filterByCategory('all')}>
        {t("filter.all-categories")}
    </div>
    <div>{categories.map(element => 
      <div key={element} 
        className={activeCategory === element ? "active-category": undefined} 
        onClick={() => filterByCategory(element)}>
          {element}
      </div>)}
    </div>
    
    <button onClick={sortAZ}>{t("sort.az")}</button>
    <button onClick={sortZA}>{t("sort.za")}</button>
    <button onClick={sortPriceAsc}>{t("sort.price-asc")}</button>
    <button onClick={sortPriceDesc}>{t("sort.price-desc")}</button>

    <div>{products.length} tk</div>

    {products.length === 0 && <Spinner />}

    {products.map(element => 
      <div key={element.id}>
        <img src={element.image} alt="" />
        <div>{element.name}</div>
        <div>{element.price}</div>
        <Button onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
      </div>)}
  </div> );
}

export default HomePage;