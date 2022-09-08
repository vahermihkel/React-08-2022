import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import productsFromFile from "../../data/products.json";

function EditProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams(); // useParamsist tulenevad väärtused on stringi kujul
  // .find() <-- leian id abil õige üles
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [idUnique, setIdUnique] = useState(true);

  const productFound = products.find(element => element.id === Number(id));
  const index = products.indexOf(productFound);

  useEffect(() => { // uef algus
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(data => setProducts(data || []));

    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/categories.json")
      .then(res => res.json())
      .then(data => setCategories(data || []));
  }, []);

  const updateProduct = () => {
    const newProduct = {
      id: Number(idRef.current.value), // ref saab jutumärkides väärtuse
      name: nameRef.current.value,
      price: Number(priceRef.current.value), // <- siia tuleb jutumärkides väärtus
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      image: imageRef.current.value,
      active: activeRef.current.checked,
    }
    products[index] = newProduct;
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
      method: "PUT",
      body: JSON.stringify(products)
    }).then(() => navigate("/admin/halda-tooteid"))
  }

  const checkIdUniqueness = () => {
    // 0,1,2,3,4,5,6....        kui ei ole: -1
    const index = products.findIndex(element => element.id === Number(idRef.current.value));
    if (index >= 0 && productFound.id !== Number(idRef.current.value)) {
      // EI OLE UNIKAALNE!
      setIdUnique(false);
    } else {
      // ON UNIKAALNE!
      setIdUnique(true);
    }
  }

  return ( 
  <div>
    {productFound !== undefined && 
    <div>
      { idUnique === false && <div>Sisestasid mitteunikaalse ID!</div>}
      <label>ID</label> <br />
      <input onChange={checkIdUniqueness} ref={idRef} defaultValue={productFound.id} type="number" /> <br />
      <label>Nimi</label> <br />
      <input ref={nameRef} defaultValue={productFound.name} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} defaultValue={productFound.price} type="number" /> <br />
      <label>Kirjeldus</label> <br />
      <input ref={descriptionRef} defaultValue={productFound.description} type="text" /> <br />
      <label>Kategooria</label> <br />
      <select ref={categoryRef} defaultValue={productFound.category}>
        {categories.map(element => <option key={element.name}>{element.name}</option>)}
      </select> <br />
      <label>Pilt</label> <br />
      <input ref={imageRef} defaultValue={productFound.image} type="text" /> <br />
      <label>Aktiivne</label> <br />
      <input ref={activeRef} defaultChecked={productFound.active} type="checkbox" /> <br />
      <button disabled={idUnique === false} onClick={updateProduct}>Muuda toode</button>
    </div>}
    {productFound === undefined && <div>Toodet ei leitud</div> }
  </div> );
}

export default EditProduct;