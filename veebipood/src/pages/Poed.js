import { useRef } from "react";
import { useState } from "react";

function Poed() {
                                    //     0            1           2          3
  const [poed, uuendaPoed] = useState(["Kristiine", "Mustamäe", "Lasnamäe", "Õismäe", "Põhja-Tallinn", "Telliskivi", "Kesklinn"]);
  const nimiRef = useRef(); // <- selle jaoks, et teda input külge panna, muutuja väärtus koguaeg vahetub

  const eemalda = (j2rjekorraNumber) => {
    poed.splice(j2rjekorraNumber,1);
    // splice on kustutamiseks, splice nõuab mitmendat ta kustutab ja mitu tk alates sellest
    uuendaPoed(poed.slice());
    // slice on koopia tegemiseks
  }

  const sorteeri = () => {
    poed.sort();  // sort mutates   muteerib
    uuendaPoed(poed.slice()); // uuenda HTMLi
  }

  const lisa = () => {
    poed.push(nimiRef.current.value);
    uuendaPoed(poed.slice());
  }

  const filtreeri = () => {
    const result = poed.filter(element => element.length > 8);
    uuendaPoed(result);
  }

  const filtreeri2 = () => {
    const result = poed.filter(element => element.includes("mäe")); // filter returns    tagastab
    uuendaPoed(result);
  }

  return ( 
    <div>
      <label>Uue poe nimi</label> <br />
      <input ref={nimiRef} type="text" /> <br />
      <button onClick={lisa}>Lisa</button> <br />
      <button onClick={sorteeri}>Sorteeri tähestiku järjekorras</button>
      <button onClick={filtreeri}>Jäta alles kõik üle 8 tähelised</button>
      <button onClick={filtreeri2}>Jäta alles kõik "mäe"-d</button>
      { poed.map( (element, index) => 
        <div key={index}>
          <span>{element}</span>
          <button onClick={() => eemalda(index)}>Eemalda</button>
        </div>) }
    </div> );
}

export default Poed;