// import productsFromFile from "../data/products.json";
import { useEffect, useState } from "react";
import Spinner from '../components/Spinner';
import { ToastContainer } from 'react-toastify';
import CarouselGallery from '../components/home/CarouselGallery';
import SortButtons from '../components/home/SortButtons';
import PageButtons from '../components/home/PageButtons';
import CategoryFilter from '../components/home/CategoryFilter';
import Product from '../components/home/Product';

function HomePage() {
  const [products, setProducts] = useState([]); // <--- seda muudan 20tk
  const [filteredProducts, setFilteredProducts] = useState([]);  //  100tk 50tk  70tk
  const [dbProducts, setDbProducts] = useState([]); // <--- seda ei muuda kunagi 237tk
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

    <CategoryFilter 
        activeCategory={activeCategory}
        filterByCategory={filterByCategory}
        categories={categories}
    />
    
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
        <Product key={element.id} element={element} />
      )}

    <PageButtons
      fProducts={filteredProducts}
      changePage={changePage}
      activePage={activePage} />

  </div> );
}

export default HomePage;