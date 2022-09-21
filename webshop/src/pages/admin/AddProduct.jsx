import { useEffect, useRef, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
// import productsFromFile from "../../data/products.json";
import { ToastContainer, toast } from 'react-toastify';
import FileUpload from "../../components/FileUpload";

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [idUnique, setIdUnique] = useState(true);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => { 
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then(res => res.json())
      .then(data => setProducts(data || []));

    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/categories.json")
      .then(res => res.json())
      .then(data => setCategories(data || []));
  }, []);

  const checkIfFilled = (ref, errorMessage) => {
      if (ref.current.value === "") { // kui on tõsi, läheb alla blokki sisse
        setMessage(errorMessage);
        return true; // tagastatakse true
      }
  }

  const addNewProduct = () => {
    const descNotFilled = checkIfFilled(descriptionRef, "Kirjeldus on täitmata"); // true liigub vasakpoolse muutuja sisse
    // const imageNotFilled = checkIfFilled(imageRef, "Pilt on täitmata");
    const priceNotFilled = checkIfFilled(priceRef, "Hind on täitmata");
    const nameNotFilled = checkIfFilled(nameRef, "Nimi on täitmata");
    const idNotFilled = checkIfFilled(idRef, "ID on täitmata");

    if (idNotFilled || nameNotFilled || priceNotFilled || descNotFilled) {
      return; // takistab funktsioonil edasi minna --> funktsioon lõpetab alati return alusel töö
    }

    const newProduct = {
      id: Number(idRef.current.value), // ref saab jutumärkides väärtuse
      name: nameRef.current.value,
      price: Number(priceRef.current.value), // <- siia tuleb jutumärkides väärtus
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      image: showImage === "url" ? imageRef.current.value : image,
      // image: image,
      active: activeRef.current.checked,
    }
    // productsFromFile.push(newProduct);
    products.push(newProduct);
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
      method: "PUT",
      body: JSON.stringify(products)
    })
    idRef.current.value = "";
    nameRef.current.value = "";
    priceRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
    // imageRef.current.value = "";
    activeRef.current.value = "";
    toast.success("Edukalt uus toode lisatud!");
  }

  const checkIdUniqueness = () => {
    // 0,1,2,3,4,5,6....        kui ei ole: -1
    const index = products.findIndex(element => element.id === Number(idRef.current.value));
    if (index >= 0) {
      // EI OLE UNIKAALNE!
      setIdUnique(false);
    } else {
      // ON UNIKAALNE!
      setIdUnique(true);
    }
  }

  const [showImage, setShowImage] = useState("upload");

  return ( 
    <div>
      <ToastContainer />
      <div>{message}</div>
      { idUnique === false && <div>Sisestasid mitteunikaalse ID!</div>}
      <label>ID</label> <br />
      <input onChange={checkIdUniqueness} ref={idRef} type="number" /> <br />
      <label>Nimi</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Kirjeldus</label> <br />
      <input ref={descriptionRef} type="text" /> <br />
      <label>Kategooria</label> <br />
      <select ref={categoryRef}>
        {categories.map(element => <option key={element.name}>{element.name}</option>)}
        {/* <option value="">speakers</option>
        <option value="">samsung</option> */}
      </select> <br />
      {/* <input ref={categoryRef} type="text" /> <br /> */}
      <label>Pilt</label> <br />
      <ButtonGroup className="mb-2">
          <ToggleButton
            id="url"
            type="radio"
            variant="outline-dark"
            name="radio"
            value="url"
            checked={showImage === "url"}
            onChange={() => setShowImage("url")}>
            URL
          </ToggleButton>
          <ToggleButton
            id="upload"
            type="radio"
            variant="outline-dark"
            name="radio"
            value="upload"
            checked={showImage === "upload"}
            onChange={() => setShowImage("upload")}>
            UPLOAD
          </ToggleButton>
      </ButtonGroup>
      { showImage === "url" && 
        <div>
          <input ref={imageRef} type="text" /><br />
        </div> }
      
      { showImage === "upload" && <FileUpload onSendPictureUrl={setImage} /> }
      <label>Aktiivne</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <button disabled={idUnique === false} onClick={addNewProduct}>Lisa toode</button>
    </div> );
}

export default AddProduct;