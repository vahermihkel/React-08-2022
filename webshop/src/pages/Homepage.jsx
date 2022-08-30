import productsFromFile from "../data/products.json";
import Button from 'react-bootstrap/Button'; 
import { useState } from "react";

function HomePage() {
  const [products, setProducts] = useState(productsFromFile);

  // [{},{},{}]
  // ["","",""]
  // js get unique values from array -> [...new Set([1,1,2])]  -> [1,2]
  const categories = [...new Set(productsFromFile.map(element => element.category))];
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
  const addToCart = (productClicked) => {
    let cart = sessionStorage.getItem("cart");  // localStorage vs sessionStorage <- sessionStorage kaob brauseri sulgumisel
    cart = JSON.parse(cart) || [];
    cart.push(productClicked);
    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);
  }

  const filterByCategory = (categoryClicked) => {
    if (categoryClicked === 'all') {
      setProducts(productsFromFile);
      setActiveCategory("all");
    } else {
      const result = productsFromFile.filter(element => element.category === categoryClicked);
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
    <div> <i>Üksiku toote vaatamine kodus</i> </div>
    <div className={activeCategory === "all" ? "active-category": undefined} onClick={() => filterByCategory('all')}>Kõik kategooriad</div>
    <div>{categories.map(element => <div className={activeCategory === element ? "active-category": undefined} onClick={() => filterByCategory(element)}>{element}</div>)}</div>
    
    <button onClick={sortAZ}>Sort A-Z</button>
    <button onClick={sortZA}>Sort Z-A</button>
    <button onClick={sortPriceAsc}>Sort price ascending</button>
    <button onClick={sortPriceDesc}>Sort price descending</button>

    <div>{products.length} tk</div>
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