import { useState } from "react";
import productsFromFile from "../../data/products.json";
import { Link } from "react-router-dom";


function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile);

  const deleteProduct = (index) => {
    products.splice(index,1);
    setProducts(products.slice());
  }

  return ( 
    <div>
      {products.map((element,index) => 
        <div>
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