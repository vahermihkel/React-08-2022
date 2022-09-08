import { useEffect, useRef, useState } from "react";
// import productsFromFile from "../../data/products.json";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function MaintainProducts() {
  const [products, setProducts] = useState([]);
  const [dbProducts, setDbProducts] = useState([]); // <--- seda ei muuda kunagi
  const searchedRef = useRef();

  // uef
  useEffect(() => { // uef algus
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(data => {
        setProducts(data || []);
        setDbProducts(data || []);
      });
  }, []); // uef lõpp

  const deleteProduct = (index) => {
    products.splice(index,1);
    setProducts(products.slice());
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
      method: "PUT",
      body: JSON.stringify(products)
    })
    toast.success("Edukalt toode kustutatud!", {
      theme: "dark",
      position: "bottom-right"
    });
  }

  const searchProducts = () => {
    const result = dbProducts.filter(element => 
      element.name.toLowerCase().includes(searchedRef.current.value.toLowerCase()) || 
      element.id.toString().includes(searchedRef.current.value));
    setProducts(result);
  }

  return ( 
    <div>
      <ToastContainer />
      <input type="text" ref={searchedRef} onChange={searchProducts} /> <span>{products.length}</span>
      {products.map((element,index) => 
        <div key={element.id}>
          <div>{element.id}</div>
          <div>{element.name}</div>
          <div>{element.price}</div>
          <div>{element.image}</div>
          <div>{element.category}</div>
          <div>{element.description}</div>
          <div>{element.active}</div>
          <button onClick={() => deleteProduct(index)}>x</button>
          <Link to={"/admin/muuda-toode/" + element.id}>
            <button>Muuda toode</button>
          </Link>
        </div>)}
    </div> );
}

export default MaintainProducts;