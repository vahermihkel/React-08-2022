import { useState } from "react";
import { Link } from 'react-router-dom';


function HaldaTooteid() {
  const [tooted, uuendaTooted] = useState(JSON.parse(localStorage.getItem("tooted")) || []);

  const kustuta = (index) => {
    tooted.splice(index,1);
    uuendaTooted(tooted.slice());
    localStorage.setItem("tooted", JSON.stringify(tooted));
  }

  return ( <div>
    {tooted.map((element,index) => 
      <div key={element.nimi + element.hind}>
        <div>{element.nimi}</div>
        <div>{element.hind}</div>
        <div>{element.aktiivsus + 0}</div>
        <button onClick={() => kustuta(index)}>x</button>
        <Link to={"/muuda/" + element.nimi}>
          <button>Muuda</button>
        </Link>
      </div>)}
  </div> );
}

export default HaldaTooteid;