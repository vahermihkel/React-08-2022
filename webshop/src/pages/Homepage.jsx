// import productsFromFile from "../data/products.json";
import Button from 'react-bootstrap/Button'; 
import { useEffect, useState } from "react";
import Spinner from '../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import CarouselGallery from '../components/CarouselGallery';
import SortButtons from '../components/SortButtons';
import PageButtons from '../components/PageButtons';

function HomePage() {
  const [products, setProducts] = useState([]); // <--- seda muudan 20tk
  const [filteredProducts, setFilteredProducts] = useState([]);  //  100tk 50tk  70tk
  const [dbProducts, setDbProducts] = useState([]); // <--- seda ei muuda kunagi 237tk
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState(1);
  
  // [{},{},{}]
  // ["","",""]
  // js get unique values from array -> [...new Set([1,1,2])]  -> [1,2]
  const categories = [...new Set(dbProducts.map(element => element.category))];
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => { // uef algus
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0,20) || []);
        setFilteredProducts(data || []);
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
      setProducts(dbProducts.slice(0,20)); // 20 toodet lehele
      setFilteredProducts(dbProducts); // 237
      setActiveCategory("all");
    } else {
      const result = dbProducts.filter(element => element.category === categoryClicked);
      setProducts(result.slice(0,20)); // 20 toodet
      setFilteredProducts(result); // mitu tk neid on
      setActiveCategory(categoryClicked);
    }  
    setActivePage(1);
  }

  const changePage = (newPage) => {
    setActivePage(newPage);
    setProducts(filteredProducts.slice(20*newPage-20,20*newPage));
  }

  return ( 
  <div>
    <div> <i>Üksiku toote vaatamine kodus</i> </div>
     <ToastContainer />

     <CarouselGallery />

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
    
   <SortButtons
        fProducts={filteredProducts}
        setFProducts={setFilteredProducts}
        changePage={changePage}
        activePage={activePage}
   />

    <div>{filteredProducts.length} tk</div>

    {products.length === 0 && <Spinner />}

    <PageButtons
      fProducts={filteredProducts}
      changePage={changePage}
      activePage={activePage} />

    {products.map(element => 
      <div key={element.id}>
        <img src={element.image} alt="" />
        <div>{element.name}</div>
        <div>{element.price}</div>
        <Button onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
      </div>)}

    <PageButtons
      fProducts={filteredProducts}
      changePage={changePage}
      activePage={activePage} />

  </div> );
}

export default HomePage;