import { useEffect, useRef, useState } from "react";
// import productsFromFile from "../../data/products.json";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function MaintainProducts() {
  const [products, setProducts] = useState([]); // KUVAN SEDA HTMLis
  const [dbProducts, setDbProducts] = useState([]); // <--- SEE ON KUST KUSTUTAN JA MILLEST MUUDAN
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

  const deleteProduct = (productClicked) => {
    const index = dbProducts.findIndex(element => element.id === productClicked.id);
    dbProducts.splice(index,1);
    setDbProducts(dbProducts.slice());

    // const index2 = products.findIndex(element => element.id === productClicked.id);
    // products.splice(index2,1);
    // setProducts(products.slice());
    searchProducts();
    // setProducts(dbProducts);
    // setProducts(products.slice());

    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
      method: "PUT",
      body: JSON.stringify(dbProducts)
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

  const changeProductActive = (productClicked) => {
    const index = dbProducts.findIndex(element => element.id === productClicked.id);
    dbProducts[index].active = !dbProducts[index].active;
    setDbProducts(dbProducts.slice());
    searchProducts(); // uuenda setProducts() <----- eesmärk, aga otsing võiks ka peale jääda
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
      method: "PUT",
      body: JSON.stringify(dbProducts)
    })
  }

  return ( 
    <div>
      <ToastContainer />
      <input type="text" ref={searchedRef} onChange={searchProducts} /> <span>{products.length}</span>
      {products.map(element => 
        <div key={element.id} className={element.active === true ? "active-product" : "inactive-product"}>
          <div onClick={() => changeProductActive(element)}>
            <div>{element.id}</div>
            <div>{element.name}</div>
            <div>{element.price}</div>
            <div>{element.image}</div>
            <div>{element.category}</div>
            <div>{element.description}</div>
            <div>{element.active}</div>
          </div>
          <button onClick={() => deleteProduct(element)}>x</button>
          <Link to={"/admin/muuda-toode/" + element.id}>
            <button>Muuda toode</button>
          </Link>
        </div>)}
    </div> );
}

export default MaintainProducts;