import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function MaintainCategories() {
  const [categories, setCategories] = useState([]);
  const [isUnique, setUnique] = useState(true);
  const categoryRef = useRef();

  // uef
  useEffect(() => { // uef algus
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/categories.json")
      .then(res => res.json())
      .then(data => setCategories(data || []));
  }, []); // uef lõpp

  const addNewCategory = () => {
    const newCategory = {
      name: categoryRef.current.value,
    }
    categories.push(newCategory);
    setCategories(categories.slice());
                                                                      // !!!!!!!!!!!
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/categories.json", {
      method: "PUT",
      body: JSON.stringify(categories)
    })
    toast.success("Edukalt uus kategooria lisatud!");
  }

  const findIfCategoryUnique = () => {
    const index = categories.findIndex(element => element.name === categoryRef.current.value);
    // -1 ---> ei leitud
    // 0,1,2
    if (index >= 0) {
      setUnique(false);
      toast.error("Sama juba olemas!");
    } else {
      setUnique(true);
    }
  }

  const deleteCategory = (index) => {
    categories.splice(index,1);
    setCategories(categories.slice());
    fetch("https://react0822-default-rtdb.europe-west1.firebasedatabase.app/categories.json", {
      method: "PUT",
      body: JSON.stringify(categories)
    })
  }

  return ( <div>
    <ToastContainer />
    {isUnique === false && <div>Kategooria nimi on mõne teise kategooriaga sama!</div> }
    <label>Kategooria</label>
    <input onChange={findIfCategoryUnique} ref={categoryRef} type="text" />
    <button disabled={isUnique === false} onClick={addNewCategory}>Lisa uus kategooria</button>

    {categories.map((element,index) => 
      <div key={element.name}>
          {element.name} 
          <button onClick={() => deleteCategory(index)}>x</button> 
      </div>)}
    </div> );
}

export default MaintainCategories;