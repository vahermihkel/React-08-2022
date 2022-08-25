import productsFromFile from "../data/products.json";
import Button from 'react-bootstrap/Button'; 

function HomePage() {

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

  return ( 
  <div>
    <div>{productsFromFile.length} tk</div>
    {productsFromFile.map(element => 
      <div key={element.id}>
        <img src={element.image} alt="" />
        <div>{element.name}</div>
        <div>{element.price}</div>
        <Button onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
      </div>)}
  </div> );
}

export default HomePage;